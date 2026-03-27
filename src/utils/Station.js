import * as utils from "./stationUtils";
import { getYear } from "date-fns";
import { quantile } from "simple-statistics";

export default class Station {
  constructor(info, data, opts) {
    const {type, param} = opts;
    if(type) this.type = type;
    if(param) this.param = param;
    this.info = info;
    this.data = this.initData(data);
    this.meta = this.initMeta();
    this.processed = {};
  }

  initData(data) {
    if(this.type === "logger"){
      const processedData = [];
      let i = 0;
      data.logsamples?.forEach(d => {
        processedData.push({date: d.date, id: i++, results: {Temp: {mean: d.value}}})
      })
      return processedData;
    } else {
      let processedData = [];
      data.sitevisits?.forEach(d => {
        const r = d.resultsv;
        let temp = {};
        r.forEach(p => {
          temp[`${p.matrix}_${p.analyte}`] = {
            isValid: p.is_valid,
            mean: p.mean,
            unit: p.unit
          };
        });
        processedData.push({ date: d.date, id: d.id, results: temp });
      });
      return processedData;
    }
  }

  initMeta() {
    let totalYearRange = utils.totalYearRange(this.data);
    let params;
    if(this.type === "logger") {
      params = ["Temp"]
    } else {
      params = utils.getParams(this.data);
    }
    return { totalYearRange, params };
  }

  setYearRange(yearRange) {
    let { startYear, endYear } = yearRange;
    let processed = this.data.filter(d => {
      const year = new Date(d.date).getFullYear();
      return year >= startYear && year <= endYear;
    });
    this.processed = { ...this.processed, startYear, endYear, data: processed };
    return this;
  }

  getCSV(notes = false) {
    let data = [];
    this.data.forEach(d => {
      let temp = { date: d.date };
      Object.keys(d.results).forEach(k => {
        temp[k] = d.results[k].mean;
      });
      if (notes) {
        temp.notes = d.notes ? d.notes : "";
      }
      data.push(temp);
    });
    const fields = ["date", ...this.meta.params];
    if (notes) fields.push("notes");

    const csvRows = [];
    csvRows.push(fields.join(','));
    data.forEach(row => {
      const values = fields.map(field => {
        const val = row[field] === undefined ? "" : row[field];
        return `"${val}"`;
      });
      csvRows.push(values.join(','));
    });
    return csvRows.join('\n');
  }

  setParam(param) {
    let byParam = this.processed.data.map(d => {
      let mean = (d.results && d.results[param] && d.results[param].mean) || null;
      return [d.date, mean];
    });
    this.processed = { ...this.processed, param, data: byParam };
    return this;
  }

  roundTo(precision) {
    this.processed.data = this.processed.data.map(d => {
      return [d[0], utils.precisionRound(d[1], precision)];
    });
    return this;
  }

  bufferData(startYear, endYear) {
    this.processed.data = utils.nullBuffer(this.processed.data, startYear, endYear);
    return this;
  }

  boxPlot() {
    let valuesOnly = [];
    this.processed.data.forEach(d => {
      if (d[1] !== null) valuesOnly.push(d[1]);
    });
    if (valuesOnly.length === 0) {
        this.processed.data = [null, null, null, null, null];
    } else {
        this.processed.data = [
          Math.min(...valuesOnly),
          quantile(valuesOnly, 0.25),
          quantile(valuesOnly, 0.5),
          quantile(valuesOnly, 0.75),
          Math.max(...valuesOnly)
        ];
    }
    return this;
  }

  boxPlotPerMonth() {
    let byMonth = utils.splitByMonth(this.processed.data, true);
    this.processed.data = byMonth.map(d => {
      let valuesOnly = d.filter(v => v[1] !== null).map(v => v[1]);
      if (valuesOnly.length > 0) {
        return [
          Math.min(...valuesOnly),
          quantile(valuesOnly, 0.25),
          quantile(valuesOnly, 0.5),
          quantile(valuesOnly, 0.75),
          Math.max(...valuesOnly)
        ];
      } else return null;
    });
    return this;
  }

  linePlot() {
    this.processed.data = this.processed.data.map(d => {
      let dateArr = d[0].split("-");
      const utcDate = Date.UTC(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]));
      return [utcDate, d[1]];
    });
    return this;
  }
}

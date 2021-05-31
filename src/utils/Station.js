import * as utils from "./stationUtils";
import { getYear } from "date-fns";
import { quantile } from "simple-statistics";
import json2csv from "json2csv";
/**
 * Base class for single Stations, get's instatiated when monitoring data is downloaded.
 * @class Station
 */
export default class Station {
  /**
   * Creates an instance of Station.
   * @exports Station
   * @param {StationInfo} info basic info like StationName, StationID
   * @param {StationVisit[]} data Array of measurments of station visits
   * @param {Object} opts options object
   * @memberof Station
   */
  constructor(info, data, opts) {
    const {type, param} = opts;
    if(type)
      this.type = type;
    if(param)
      this.param = param;
    this.info = info;
    this.data = this.initData(data);
    this.meta = this.initMeta();
    this.processed = {};
  }
  /**
   * Validates and simplifies server response from **sitevisits** query
   *
   * @param {StationVisit[]} data server response from **sitevisits** query
   * @returns {StationVisit[]} takes .mean out and sets H2O_Temp etc directly to 'mean'
   * @memberof Station
   */
  initData(data) {
    if(this.type === "logger"){
      console.log("initData Logger")
      const processedData = [];
      let i = 0;
      data.logsamples.map(d => {
        processedData.push({date: d.date, id: i++, results: {Temp: {mean: d.value}}})
      })
      return processedData;
    } else {
      let processedData = [];
      data.sitevisits.map(d => {
        const r = d.resultsv;
        let temp = {};
        r.map(p => {
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
  /**
   * sets meta data like totalYearRange, params etc
   *
   * @returns {Object} meta data {totalYearRange, params}
   * @memberof Station
   */
  initMeta() {
    let totalYearRange = utils.totalYearRange(this.data);
    let params;

    if(this.type === "logger") {
      params = ["Temp"]
    } else {
      params = utils.getParams(this.data);
    }
    console.log("initMeta", totalYearRange, params)

    return {
      totalYearRange,
      params
    };
  }
  /**
   * only returns data between **startYear** and **endYear** |
   * uses the whole dataset from the server, should be first method used on Station |
   * **adds data property to this.processed** |
   * ** data property is in SiteVisit format** |
   * @param {YearRange} yearRange  {startYear: number, endYear: number}
   * @returns {Object} this - for chaining
   */
  setYearRange(yearRange) {
    let { startYear, endYear } = yearRange;
    let processed = this.data.filter(d => {
      if (getYear(d.date) >= startYear && getYear(d.date) <= endYear) {
        return true;
      }
    });
    this.processed = {
      ...this.processed,
      startYear,
      endYear,
      data: processed
    };
    return this; // Necessary for chaining
  }
  /**
   * fills this.processed.data with csv result.
   * By default doesn't include notes but with (true) can be included
   *
   * @param {boolean} [notes=false]
   * @returns this
   * @memberof Station
   */
  getCSV(notes = false) {
    let data = [];
    console.log("getCSV", this.type, this.param, this);
    this.data.map(d => {
      //console.log("d", d);
      let temp = { date: d.date };
      // if(this.type === "logger"){
      //   // const name = this.param && this.param.Name
      //   temp["Temp"] = d.value
      //   //console.log("temp", temp)
      // } else {
        Object.keys(d.results).map(k => {
          //console.log("k", k);
          temp[k] = d.results[k].mean;
        });
        //console.log("temp", temp);
        if (notes) {
          temp.notes = d.notes ? d.notes : "";
        }
      //}
      data.push(temp);
    });
    let fields = [...this.meta.params];
    if (notes) {
      fields.push("notes");
    }
    console.log("data", data);
    console.log("fields", fields);
    return json2csv.parse(data, fields);
  }
  /**
   * Only returns data from the **param** parameter |
   * ** data property is now in [dateStr, mean value] format** |
   *
   * @param {string} param - i.e H2O_Temp, H2O_Cond
   * @memberof Station
   */
  setParam(param) {
    console.log("Station.setParam", param)

    let byParam = this.processed.data.map(d => {
      //console.log("d", d);
      let mean =
        (d.results && d.results[param] && d.results[param].mean) || null;
      return [d.date, mean];
    });
    this.processed = {
      ...this.processed,
      param,
      data: byParam
    };
    return this;
  }
  /**
   * rounds all numbers to 'precision', returns null for null
   *
   * @param {number} precision - precision of return, i.e 1 => 12.1
   * @returns {Object} this
   * @memberof Station
   */
  roundTo(precision) {
    this.processed.data = this.processed.data.map(d => {
      return [d[0], utils.precisionRound(d[1], precision)];
    });
    return this;
  }
  /**
   * adds in null data for months that don't have any data so that the graph shows a gap!
   * adds them in this.processed.data
   *
   * @returns {Object} this
   * @memberof Station
   */
  bufferData(startYear, endYear) {
    this.processed.data = utils.nullBuffer(
      this.processed.data,
      startYear,
      endYear
    );
    return this;
  }
  /**
   * creates Array of [min,q25,q5,q75,max] for boxplots by station
   *
   * @returns  {Array} [min,q25,q5,q75,max]
   * @memberof Station
   */
  boxPlot() {
    let valuesOnly = [];
    this.processed.data.map(d => {
      if (d[1] || d[1] === 0) {
        valuesOnly.push(d[1]);
      }
    });
    this.processed.data = [
      Math.min(...valuesOnly),
      quantile(valuesOnly, 0.25),
      quantile(valuesOnly, 0.5),
      quantile(valuesOnly, 0.75),
      Math.max(...valuesOnly)
    ];
    return this;
  }
  /**
   * creates Array of 12 Arrays of [min,q25,q5,q75,max] for a boxplot by month for a single station
   *
   * @returns  {Array[]} [[min,q25,q5,q75,max],[...],[...]]
   * @memberof Station
   */
  boxPlotPerMonth() {
    let byMonth = utils.splitByMonth(this.processed.data, true);
    this.processed.data = byMonth.map(d => {
      let valuesOnly = d.map(v => {
        if (v[1] || v[1] === 0) {
          return v[1];
        }
      });
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

  /**
   * preps data for linePlot, turns 'YYYY-MM-DD' into UTC milliseconds
   *
   * @returns {Array[]} [[date,value],[date,value],....]
   * @memberof Station
   */
  linePlot() {
    this.processed.data = this.processed.data.map(d => {
      let dateArr = d[0].split("-");
      d[0] = Date.UTC(dateArr[0], dateArr[1] - 1, dateArr[2]);
      return d;
    });
    return this;
  }
  /**
   * this.processed.data in now Array of 12 with all the Jan,Feb data
   *
   * @returns {Array[]}
   * @memberof Station
   */
  linePlotByMonth() {
    // NOTE: this might be better as a scatter plot
    // TODO: Double check how it works!!!! Not sure it's good.
    let byMonth = utils.splitByMonth(this.processed.data);
    this.processed.data = byMonth.map(m => {
      m.map = m.map(d => {
        let dateArr = d[0].split("-");
        d[0] = Date.UTC(dateArr[0], dateArr[1], dateArr[2]);
        return d;
      });
      return m;
    });
    return this;
  }
}

/**
 * @global
 * @typedef {Object} StationInfo          - general info like **StationName** etc
 * @property {boolean} Active             - still being sampled?
 * @property {string} County              - US county
 * @property {string} ForkTribGroup       - i.e 'SYT' South Yuba Tributary
 * @property {string} LocalWaterBody      - actual stream, i.e. 'Poorman Creek'
 * @property {string} LocalWatershed      - larger watershed, i.e 'Yuba Watershed'
 * @property {string} StationCode         - alphanumeric Code
 * @property {number} StationID           - internal id
 * 

/**
* @global
* @typedef {Object}  StationVisit     - StationVisit complete station visit with date, notes and results
* @property {string} id               - unique ID of sitevisit
* @property {string} date             - date in 'YYYY-MM-DD'
* @property {string} notes            - notes of the sitevisit
* @property {Results}  results        - actual data gathered
* @property {Result[]}  resultsv        - actual data gathered
*/

/**
 * @global
 * @typedef {Object} Result              - datapoints DO, Temp etc, but no date
 * @property {string} matrix           -
 * @property {string} analyte             - 
 * @property {number[]} vals             - 
 * @property {number} mean           - 
 * @property {boolean} is_valid           - 
 */

/**
 * @global
 * @typedef {Object} Results             - datapoints DO, Temp etc, but no date
 * @property {number} H2O_Temp           - water temp
 * @property {number} H2O_ph             - water pH
 * @property {number} H2O_DO             - water DO
 * @property {number} H2O_Turb           - water Turbidity
 * @property {number} H2O_Cond           - water Conductivity
 * @property {number} Air_Temp           - Air Temp
 */

/**
 * @global
 * @typedef {Object}  YearRange   - { startYear, endYear }
 * @property {number} startYear   - first year of records
 * @property {number} endYear     - last year of records
 */

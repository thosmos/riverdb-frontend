
<template>
  <div>
    <highcharts :options="chartOptions"
                :key="getNewKey()"></highcharts>
  </div>
</template>

<script>
import { singleStation, monthsOnXAxis } from "../assets/chart/graphConfig.js";
import {
  getUnit,
  getParamInfoLine,
  getFullParamName,
  getMinMaxValue
} from "../utils/charts.js";
import shortid from "shortid";

import get from "lodash/get";

export default {
  name: "ChartsBoxChartPerMonth",
  props: {
    selection: Object,
    data: Object
  },
  computed: {
    filename: function() {
      return `${this.plotData[0].name} monthy box plot ${
        this.selection.activeParam
      }`;
    },
    plotData: function() {
      let temp = this.data.selectedStation
        .setYearRange({
          startYear: this.data.startYear,
          endYear: this.data.endYear
        })
        .setParam(this.selection.activeParam)
        .roundTo(1)
        .bufferData(this.data.startYear, this.data.endYear)
        .boxPlotPerMonth();
      return [
        {
          name: get(this.data, "selectedStation.info.StationName", "aaaa"),
          data: temp.processed.data
        }
      ];
    },
    chartOptions: function() {
      let minMax = getMinMaxValue(this.plotData);
      return {
        chart: {
          type: "boxplot"
        },
        ...singleStation(
          get(this.data, "selectedStation.info.StationName", "xxxxx"),
          this.selection.activeParam
        ),
        ...monthsOnXAxis,
        yAxis: {
          title: {
            text:
              getFullParamName(this.selection.activeParam) +
              getUnit(this.selection.activeParam)
          },

          plotLines: getParamInfoLine(this.selection.activeParam),
          min: minMax[0],
          max: minMax[1]
        },
        exporting: {
          filename: this.filename
        },
        // tooltip: {
        //   headerFormat: "<b>{series.name}</b><br>",
        //   pointFormat: "{point.x:%e. %b}: {point.y:.2f} m"
        // },
        series: this.plotData
      };
    }
  },
  methods: {
    getNewKey: function() {
      return shortid.generate();
    }
  }
};
</script>

<style>
</style>

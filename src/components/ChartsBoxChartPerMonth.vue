
<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { singleStation, monthsOnXAxis } from "../assets/chart/graphConfig.js";
import { getUnit, getParamInfoLine } from "../utils/charts.js";

import get from "lodash/get";

export default {
  name: "ChartsBoxChartPerMonth",
  props: {
    selection: Object,
    data: Object
  },
  computed: {
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
              this.selection.activeParam + getUnit(this.selection.activeParam)
          },

          plotLines: getParamInfoLine(this.selection.activeParam)
        },
        // tooltip: {
        //   headerFormat: "<b>{series.name}</b><br>",
        //   pointFormat: "{point.x:%e. %b}: {point.y:.2f} m"
        // },
        series: this.plotData
      };
    }
  }
};
</script>

<style>
</style>

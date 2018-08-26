
<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { palette1 } from "../assets/chart/palettes.js";
import { singleStation, monthsOnXAxis } from "../assets/chart/graphConfig.js";

import get from "lodash/get";

export default {
  name: "ChartsBoxChartPerMonth",
  props: {
    selection: Object,
    data: Object
  },
  computed: {
    plotData: function() {
      let data = [];
      let temp = this.data.selectedStation
        .setYearRange({
          startYear: this.data.startYear,
          endYear: this.data.endYear
        })
        .setParam(this.selection.activeParam)
        .roundTo(1)
        .bufferData(this.data.startYear, this.data.endYear)
        .boxPlotPerMonth();
      // data.push({
      //   name: s.info.StationName,
      //   data: [temp.processed.data]
      // });
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
        // tooltip: {
        //   headerFormat: "<b>{series.name}</b><br>",
        //   pointFormat: "{point.x:%e. %b}: {point.y:.2f} m"
        // },
        tooltip: {
          shared: false
        },

        // colors: palette[0],
        series: this.plotData
        // series: [
        //   {
        //     name: "Observations",
        //     data: [
        //       [760, 801, 848, 895, 965],
        //       [733, 853, 939, 980, 1080],
        //       [714, 762, 817, 870, 918]
        //     ],
        //     tooltip: {
        //       headerFormat: "<em>Station {point.key}</em><br/>"
        //     }
        //   }
        // ]
      };
    }
  }
};
</script>

<style>
</style>

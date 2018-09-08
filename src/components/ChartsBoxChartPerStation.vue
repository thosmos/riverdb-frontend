<template>
  <div>
    <highcharts :options="chartOptions"
                :key="getNewKey()"></highcharts>
  </div>
</template>

<script>
import { multiStation, graphConfig } from "../assets/chart/graphConfig.js";
import { palette1 } from "../assets/chart/palettes.js";
import {
  getUnit,
  getParamInfoLine,
  getFullParamName
} from "../utils/charts.js";
import shortid from "shortid";

export default {
  name: "ChartsBoxChartPerStation",
  props: {
    selection: Object,
    data: Object
  },
  computed: {
    // joinedNames: function() {
    //   return (
    //     (this.loadedStations && this.loadedStations.map(s => s.StationName)) ||
    //     []
    //   );
    // },
    plotData: function() {
      if (this.data.loadedStations) {
        let data = [];
        this.data.loadedStations.map(s => {
          let temp = s
            .setYearRange({
              startYear: this.data.startYear,
              endYear: this.data.endYear
            })
            .setParam(this.selection.activeParam)
            .roundTo(1)
            .bufferData(this.data.startYear, this.data.endYear)
            .boxPlot();
          data.push({
            name: s.info.StationName,
            data: [temp.processed.data]
          });
        });
        return data;
      } else {
        return {};
      }
    },
    chartOptions: function() {
      return {
        chart: {
          type: "boxplot"
        },
        ...graphConfig,
        ...multiStation(this.data.loadedStations, this.selection.activeParam),
        xAxis: {
          // categories:
          //   this.data.loadedStations &&
          //   this.data.loadedStations.map(s => s.info.StationName)
          labels: { enabled: false }
        },
        yAxis: {
          title: {
            text:
              getFullParamName(this.selection.activeParam) +
              getUnit(this.selection.activeParam)
          },
          plotLines: getParamInfoLine(this.selection.activeParam)
        },
        tooltip: {
          // shared: false
        },
        plotOptions: {
          series: {
            animation: false
          }
        },
        colors: palette1,
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

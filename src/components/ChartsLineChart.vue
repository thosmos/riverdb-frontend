<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { palette1 } from "../assets/chart/palettes.js";
import { multiStation, graphConfig } from "../assets/chart/graphConfig.js";
import { getUnit, getParamInfoLine } from "../utils/charts.js";

import cloneDeep from "lodash/cloneDeep";

export default {
  name: "ChartsLineChart",
  props: {
    selection: Object,
    data: Object
  },
  computed: {
    plotData: function() {
      if (this.data.loadedStations) {
        let data = [];
        this.data.loadedStations.map(s => {
          // activeParam
          let temp = s
            .setYearRange({
              startYear: this.selection.selectionRange[0],
              endYear: this.selection.selectionRange[1]
            })
            .setParam(this.selection.activeParam)
            .roundTo(1)
            .bufferData(
              this.selection.selectionRange[0],
              this.selection.selectionRange[1]
            )
            .linePlot();
          data.push({
            name: s.info.StationName,
            type: "spline",
            data: temp.processed.data
          });
          // secondaryParam
          if (this.selection.secondaryParam) {
            let sec = cloneDeep(s);
            let temp = sec
              .setYearRange({
                startYear: this.selection.selectionRange[0],
                endYear: this.selection.selectionRange[1]
              })
              .setParam(this.selection.secondaryParam)
              .roundTo(1)
              .bufferData(
                this.selection.selectionRange[0],
                this.selection.selectionRange[1]
              )
              .linePlot();
            data.push({
              name: s.info.StationName,
              data: temp.processed.data,
              type: "spline",
              yAxis: 1
            });
          }
        });
        return data;
      } else {
        return {};
      }
    },
    chartOptions: function() {
      return {
        chart: {
          type: "spline",
          zoomType: 'xy"'
        },
        ...graphConfig,
        ...multiStation(this.data.loadedStations, this.selection.activeParam),
        xAxis: [
          {
            type: "datetime",
            title: {
              text: "Date"
            }
          }
        ],
        yAxis: [
          {
            title: {
              text:
                this.selection.activeParam + getUnit(this.selection.activeParam)
            },
            plotLines: getParamInfoLine(this.selection.activeParam)
          },
          {
            title: {
              text:
                this.selection.secondaryParam +
                getUnit(this.selection.secondaryParam)
            },
            opposite: true
            // plotLines: getParamInfoLine(this.selection.activeParam)
          }
        ],
        tooltip: {
          shared: true
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: true,
              radius: 2.5,
              symbol: "circle"
            },
            lineWidth: 1.5
          },
          series: {
            animation: false
          }
        },

        colors: palette1,
        series: this.plotData
      };
    }
  }
};
</script>

<style>
</style>

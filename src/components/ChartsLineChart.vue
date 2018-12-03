<template>
  <div>
    <highcharts :options="chartOptions"
                ref="chart"
                :key="data.uniqueKey"></highcharts>
  </div>
</template>

<script>
import { palette1 } from "../assets/chart/palettes.js";
import { multiStation, graphConfig } from "../assets/chart/graphConfig.js";
import {
  getUnit,
  getParamInfoLine,
  getFullParamName,
  getMinMaxValue
} from "../utils/charts.js";

import cloneDeep from "lodash/cloneDeep";
export default {
  name: "ChartsLineChart",
  props: {
    selection: Object,
    data: Object
  },
  computed: {
    getYearRange: function() {
      let range = this.selection.selectionRange;
      return range[0] === range[1]
        ? range[0]
        : `from ${range[0]} to ${range[1]}`;
    },
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
            name: this.selection.secondaryParam
              ? this.selection.activeParam
              : s.info.StationName,
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
              name: this.selection.secondaryParam,
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
      let minMax = getMinMaxValue(this.plotData);
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
                getFullParamName(this.selection.activeParam) +
                getUnit(this.selection.activeParam)
            },
            plotLines: getParamInfoLine(this.selection.activeParam),
            min: minMax[0],
            max: minMax[1]
          },
          { ...this.secondaryAxis() }
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
        series: this.plotData,
        exporting: {
          filename: `line chart ${this.selection.activeParam} ${
            this.getYearRange
          }`
        }
      };
    }
  },
  methods: {
    secondaryAxis() {
      if (this.selection.secondaryParam) {
        return {
          title: {
            text:
              getFullParamName(this.selection.secondaryParam) +
              getUnit(this.selection.secondaryParam)
          },
          opposite: true
        };
      } else
        return {
          // needs to be empty string, otherwise dummy 'values' will be rendered
          title: {
            text: ""
          },
          opposite: true
        };
    }
  }
};
</script>

<style>
</style>

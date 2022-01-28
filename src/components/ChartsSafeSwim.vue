<template>
  <div id="container">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { palette1 } from "../assets/chart/palettes.js";
import {
  multiStation,
  graphConfig,
  singleStation,
} from "../assets/chart/graphConfig.js";
import {
  getUnit,
  getParamInfoLine,
  getFullParamName,
  getMinMaxValue,
  getSafetoSwimChartValues,
  getSafetoSwimChartGeomeans,
} from "../utils/charts.js";

import cloneDeep from "lodash/cloneDeep";
export default {
  name: "ChartsLineChart",
  props: {
    swimstation: Object,
  },
  computed: {
    // getYearRange: function() {
    //   let range = this.selection.selectionRange;
    //   return range[0] === range[1]
    //     ? range[0]
    //     : `from ${range[0]} to ${range[1]}`;
    // },
    // plotData: function() {
    //   if (this.data.loadedStations) {
    //     let data = [];
    //     this.data.loadedStations.map(s => {
    //       // activeParam
    //       let temp = s
    //         .setYearRange({
    //           startYear: this.selection.selectionRange[0],
    //           endYear: this.selection.selectionRange[1]
    //         })
    //         .setParam(this.selection.activeParam)
    //         .roundTo(1)
    //         .bufferData(
    //           this.selection.selectionRange[0],
    //           this.selection.selectionRange[1]
    //         )
    //         .linePlot();
    //       data.push({
    //         name: this.selection.secondaryParam
    //           ? this.selection.activeParam
    //           : s.info.StationName,
    //         type: "spline",
    //         data: temp.processed.data
    //       });
    //       // secondaryParam
    //       if (this.selection.secondaryParam) {
    //         let sec = cloneDeep(s);
    //         let temp = sec
    //           .setYearRange({
    //             startYear: this.selection.selectionRange[0],
    //             endYear: this.selection.selectionRange[1]
    //           })
    //           .setParam(this.selection.secondaryParam)
    //           .roundTo(1)
    //           .bufferData(
    //             this.selection.selectionRange[0],
    //             this.selection.selectionRange[1]
    //           )
    //           .linePlot();
    //         data.push({
    //           name: this.selection.secondaryParam,
    //           data: temp.processed.data,
    //           type: "spline",
    //           yAxis: 1
    //         });
    //       }
    //     });
    //     return data;
    //   } else {
    //     return {};
    //   }
    // },
    chartOptions: function () {
      // let minMax = getMinMaxValue(this.plotData);
      const options = {
        chart: {
          type: "line", //"scatter",
          zoomType: "x",
        },
        title: {
          text:
            "ecoli MPN/100mL at " +
            this.swimstation.StationName +
            ", " +
            this.swimstation.Agency.AgencyCode,
        },
        // ...graphConfig,
        // ...multiStation(this.data.loadedStations, this.selection.activeParam),
        xAxis: [
          {
            type: "datetime",
            title: {
              text: "Date",
            },
          },
        ],
        yAxis: [
          {
            // endOnTick: false,
            // startOnTick: false,
            title: {
              text: "ecoli MPN/100mL",
              // getFullParamName(this.selection.activeParam) +
              // getUnit(this.selection.activeParam)
            },
            type: "logarithmic",
            plotLines: [
              {
                value: 320,
                color: palette1[0],
                width: 2,
                label: {
                  align: "left",
                  style: { color: palette1[0] },
                  text: "Statistical Threshold Value (STV): 320 MPN/100 mL",
                },
              },
              {
                value: 100,
                color: palette1[1],
                width: 2,
                label: {
                  align: "left",
                  style: { color: palette1[1] },
                  text: "Geometric Mean Threshold: 100 MPN/100 mL",
                },
              },
            ],
            //getParamInfoLine(this.selection.activeParam),
            // min: 0,
            max: 420,
          },
          // { ...this.secondaryAxis() }
        ],
        tooltip: {
          shared: true,
        },
        plotOptions: {
          line: {
            marker: {
              enabled: true,
              radius: 2.5,
              symbol: "circle",
            },

            lineWidth: 0,
            states: {
              hover: {
                lineWidthPlus: 0,
              },
            },
          },
          series: {
            animation: false,
          },
        },

        colors: palette1,
        series: [
          {
            name: "sample",
            type: "line",
            data: getSafetoSwimChartValues(this.swimstation.values),
          },
          {
            name: "geomean",
            type: "line",
            data: getSafetoSwimChartGeomeans(this.swimstation.values),
          },
        ],
        exporting: {
          filename: `chart ecoli`,
        },
      };
      console.log("CHART OPTIONS", options);
      return options;
    },
  },
  methods: {
    secondaryAxis() {
      if (this.selection.secondaryParam) {
        return {
          title: {
            text:
              getFullParamName(this.selection.secondaryParam) +
              getUnit(this.selection.secondaryParam),
          },
          opposite: true,
        };
      } else
        return {
          // needs to be empty string, otherwise dummy 'values' will be rendered
          title: {
            text: "",
          },
          opposite: true,
        };
    },
  },
};
</script>

<style>
</style>

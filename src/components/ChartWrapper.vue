<template>
  <div v-if="data && data.selectedStation"
       class="ui container">
    <h1>Charts</h1>
    <highcharts class="chart"
                :options="chartOptions"></highcharts>

  </div>
</template>

<script>
import { mapState } from "vuex";
import graphConfig from "../assets/graphConfig.js";

export default {
  name: "ChartWrapper",

  data() {
    return {};
  },
  computed: {
    ...mapState({
      ui: state => state.ui,
      selection: state => state.selection,
      data: state => state.data
    }),
    plotData: function() {
      console.log("this.data.selectedStation", this.data.selectedStation);
      if (this.data.selectedStation) {
        let test = this.data.selectedStation
          .setYearRange({ startYear: 2010, endYear: 2017 })
          .setParam("H2O_Temp")
          .bufferData()
          .linePlot();
        return test.processed.data;
      } else {
        return {};
      }
    },
    chartOptions: function() {
      return {
        chart: {
          type: "spline"
        },
        title: {
          text:
            (this.data.selectedStation &&
              this.data.selectedStation.info.StationName) ||
            ""
        },
        subtitle: {
          text: `from ${
            this.data.selectedStation.meta.totalYearRange.startYear
          } till ${this.data.selectedStation.meta.totalYearRange.endYear}`
        },
        xAxis: {
          type: "datetime",
          // dateTimeLabelFormats: {
          //   // don't display the dummy year
          //   month: "%e. %b",
          //   year: "%b"
          // },
          title: {
            text: "Date"
          }
        },
        yAxis: {
          title: {
            text: "Snow depth (m)"
          },
          min: 0
        },
        tooltip: {
          headerFormat: "<b>{series.name}</b><br>",
          pointFormat: "{point.x:%e. %b}: {point.y:.2f} m"
        },

        plotOptions: {
          spline: {
            marker: {
              enabled: true
            }
          }
        },

        colors: ["#6CF", "#39F", "#06C", "#036", "#000"],
        series: [
          {
            name: "Winter 2014-2015",
            data: [
              ...this.plotData
              // [1264982400000, null],
              // [1267401600000, null],
              // [1270080000000, null],
              // [1272672000000, null],
              // [1275955200000, 10.27],
              // [1277942400000, null],
              // [1281398400000, 20.4],
              // [1283299200000, null],
              // [1286668800000, 16.33],
              // [1288569600000, null],
              // [1291507200000, 11.3],
              // [1293840000000, null],
              // [1296518400000, null],
              // [1298937600000, null]

              // [Date.UTC(1970, 10, 25), 0],
              // [Date.UTC(1970, 11, 6), 0.25],
              // [Date.UTC(1970, 11, 20), 1.41],
              // [Date.UTC(1970, 11, 25), 1.64],
              // [Date.UTC(1971, 0, 4), 1.6],
              // [Date.UTC(1971, 0, 17), 2.55],
              // [Date.UTC(1971, 0, 24), 2.62],
              // [Date.UTC(1971, 1, 4), 2.5],
              // [Date.UTC(1971, 1, 14), 2.42],
              // [Date.UTC(1971, 2, 6), 2.74],
              // [Date.UTC(1971, 2, 14), 2.62],
              // [Date.UTC(1971, 2, 24), 2.6],
              // [Date.UTC(1971, 3, 1), 2.81],
              // [Date.UTC(1971, 3, 11), 2.63],
              // [Date.UTC(1971, 3, 27), 2.77],
              // [Date.UTC(1971, 4, 4), 2.68],
              // [Date.UTC(1971, 4, 9), 2.56],
              // [Date.UTC(1971, 4, 14), 2.39],
              // [Date.UTC(1971, 4, 19), 2.3],
              // [Date.UTC(1971, 5, 4), 2],
              // [Date.UTC(1971, 5, 9), 1.85],
              // [Date.UTC(1971, 5, 14), 1.49],
              // [Date.UTC(1971, 5, 19), 1.27],
              // [Date.UTC(1971, 5, 24), 0.99],
              // [Date.UTC(1971, 5, 29), 0.67],
              // [Date.UTC(1971, 6, 3), 0.18],
              // [Date.UTC(1971, 6, 4), 0]
            ]
          }
        ]
      };
    }
  }
};
</script>

<style>
</style>

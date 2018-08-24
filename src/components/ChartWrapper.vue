<template>
  <div v-if="data && data.selectedStation"
       class="ui container">
    <sui-divider></sui-divider>
    <highcharts class="chart"
                :options="chartOptions"></highcharts>

  </div>
</template>

<script>
import { mapState } from "vuex";
import graphConfig from "../assets/graphConfig.js";

import { palette } from "../assets/charts.js";

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
      if (this.data.loadedStations) {
        let data = [];
        this.data.loadedStations.map(s => {
          let temp = s
            .setYearRange({ startYear: 2001, endYear: 2017 })
            .setParam("H2O_Temp")
            .roundTo(1)
            .bufferData()
            .linePlot();
          data.push({
            name: s.info.StationName,
            data: temp.processed.data
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
          type: "spline",
          zoomType: 'xy"'
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
            text: "Temp in C"
          }
        },
        // tooltip: {
        //   headerFormat: "<b>{series.name}</b><br>",
        //   pointFormat: "{point.x:%e. %b}: {point.y:.2f} m"
        // },
        tooltip: {
          shared: true
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: true,
              radius: 4
            }
          },
          series: {
            animation: false
          }
        },

        colors: palette,
        series: this.plotData
      };
    }
  }
};
</script>

<style>
</style>

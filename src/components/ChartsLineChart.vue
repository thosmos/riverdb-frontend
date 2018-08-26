<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { palette1 } from "../assets/chart/palettes.js";
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
            text: this.selection.activeParam
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

        colors: palette1,
        series: this.plotData
      };
    }
  }
};
</script>

<style>
</style>

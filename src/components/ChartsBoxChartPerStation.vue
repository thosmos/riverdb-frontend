<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { palette } from "../assets/charts.js";

export default {
  name: "ChartsBoxChart",
  props: {
    selection: Object,
    data: Object
  },
  computed: {
    plotData: function() {
      if (this.data.loadedStations) {
        let data = [];
        this.data.loadedStations.map(s => {
          try {
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
          } catch (err) {
            console.log("err", err);
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
          type: "boxplot"
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
          // dateTimeLabelFormats: {
          //   // don't display the dummy year
          //   month: "%e. %b",
          //   year: "%b"
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
          shared: false
        },
        plotOptions: {
          // spline: {
          //   marker: {
          //     enabled: true,
          //     radius: 4
          //   }
          // },
          series: {
            animation: false
          }
        },

        colors: palette,
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

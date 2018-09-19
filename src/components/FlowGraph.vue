<template>
  <div v-if="data">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { graphConfig } from "../assets/chart/graphConfig.js";
export default {
  name: "FlowGraph",
  props: {
    stations: Object,
    data: Array,
    code: String
  },
  computed: {
    plotData: function() {
      if (this.data && this.data.length > 0) {
        let graphData = this.data.map(d => {
          var date = new Date(d.date);
          var now_utc = Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds()
          );

          console.log("now_utc", now_utc);
          return [now_utc, d.value];
        });
        return [
          {
            name: "Flow",
            data: graphData,
            type: "spline"
          }
        ];
      }
    },
    chartOptions: function() {
      return {
        chart: {
          type: "spline",
          zoomType: 'xy"'
        },
        ...graphConfig,
        title: {
          text: this.code
        },
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
              text: "CFS"
            }
          }
        ],
        tooltip: {
          shared: true
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: false,
              radius: 2.5,
              symbol: "circle"
            },
            lineWidth: 1.5
          },
          series: {
            animation: false
          }
        },

        // colors: palette1,
        series: this.plotData
      };
    }
  }
};
</script>

<style>
</style>

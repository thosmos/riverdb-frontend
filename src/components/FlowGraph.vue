<template>
  <div v-if="data">
    <div v-if="validData">
      <highcharts :constructor-type="'stockChart'"
                  :options="chartOptions">
      </highcharts>
      <br />
    </div>
    <div v-else
         class="ui segment">
      <h5>No valid data for {{this.station.name}}</h5>
    </div>
    <br />
  </div>
</template>

<script>
import { graphConfig } from "../assets/chart/graphConfig.js";
export default {
  name: "FlowGraph",
  props: {
    station: Object,
    data: Array,
    code: String
  },
  computed: {
    validData: function() {
      let valid = false;
      for (let i = 0; i < this.data.length; i++) {
        // check for -9998 etc
        if (this.data[i].value > 0) {
          valid = true;
          break;
        }
      }
      return valid;
    },
    plotData: function() {
      if (this.data && this.data.length > 0) {
        let graphData = this.data.map(d => {
          var date = new Date(d.date);
          var utc = Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds()
          );
          // if (utc && d.value) {
          return [utc, d.value];
          // }
        });
        return [
          {
            name: "Flow in cubic feet per second",
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
          text: this.station.name
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
        rangeSelector: {
          selected: 1,
          enabled: false
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

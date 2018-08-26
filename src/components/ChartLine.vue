<template>
  <sui-container id="chart-line">

    <sui-tab @change="handleChange">
      <sui-tab-pane title="multi year">
        <highcharts class="chart chart-spacer"
                    :options="chartOptions"></highcharts>
      </sui-tab-pane>
      <sui-tab-pane title="single year">
        <highcharts class="chart chart-spacer"
                    :options="chartOptions"></highcharts>
      </sui-tab-pane>
    </sui-tab>
  </sui-container>
</template>

<script>
import { palette } from "../assets/charts.js";

export default {
  name: "ChartLineMultiYear",
  props: { data: Object, selection: Object },
  methods: {
    handleChange: function(e, activePane, index) {
      if (index === 0) {
        this.$store.commit("selection/SELECT_SINGLE_YEAR", false);
        this.$store.commit("selection/SET_YEAR_RANGE", [
          this.data.startYear,
          this.data.endYear
        ]);
      } else {
        this.$store.commit("selection/SELECT_SINGLE_YEAR", true);
        this.$store.commit("selection/SET_YEAR_RANGE", [
          this.data.endYear,
          this.data.endYear
        ]);
      }
    }
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

        colors: palette,
        series: this.plotData
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";

#chart-line > div > div.ui.tab.segment.attached.active {
  background: $darkWhite;
}
</style>

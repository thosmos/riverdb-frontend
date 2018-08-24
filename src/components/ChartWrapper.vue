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
    return {
      title: "",
      points: [10, 0, 8, 2, 6, 4, 5, 5],
      chartType: "Spline",
      seriesColor: "#6fcd98",
      colorInputIsSupported: null,
      animationDuration: 1000,
      updateArgs: [true, true, { duration: 1000 }]
      // chartOptions: {
      //   chart: {
      //     type: "spline"
      //   },
      //   title: {
      //     text: "Sin chart"
      //   }
      //   // series: [
      //   //   {
      //   //     data:
      //   //       this.plotData &&
      //   //       this.plotData.processed &&
      //   //       this.plotData.processed.data,
      //   //     color: "#6fcd98"
      //   //   }
      //   // ]
      // }
    };
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
        console.log("test", test);
        console.log("test.processed.data", test.processed.data);
        return test.processed.data;
      } else {
        return {};
      }
    },
    chartOptions: function() {
      return {
        ...graphConfig,
        chart: {
          type: "spline",
          zoomType: 'xy"'
        },
        title: {
          text: "Something"
        },
        tooltip: { shared: true },
        // https://experience.sap.com/fiori-design-web/values-and-names/
        colors: [
          "#5cbae6",
          "#b6d957",
          "#fac364",
          "#08cd3ff",
          "#d998cb",
          "#f2d249",
          "#93b9c6",
          "#ccc5a8",
          "52bacc",
          "dbd46",
          "98aafb"
        ],
        series: [[this.plotData]],
        xAxis: {
          type: "datetime",
          // dateTimeLabelFormats: {
          //   month: "e%. b%",
          //   year: "%b"
          // },
          title: {
            text: "Date"
          }
        },
        yAxis: {
          title: {
            text: " Whywhywhy"
          }
          // type: "logarithmic"
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: true,
              radius: 3
            }
          },
          series: { animation: false }
        },
        legend: {
          enabled: true
        }
      };
    }
  }
};
</script>

<style>
</style>

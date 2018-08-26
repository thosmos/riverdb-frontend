<template>
  <sui-container id="chart-line">

    <sui-tab @change="handleChange">
      <sui-tab-pane title="multi year line">
        <charts-line-chart class="chart chart-spacer"
                           :selection="selection"
                           :data="data"></charts-line-chart>
      </sui-tab-pane>
      <sui-tab-pane title="single year line">
        <charts-line-chart class="chart chart-spacer"
                           :selection="selection"
                           :data="data"></charts-line-chart>
      </sui-tab-pane>
      <sui-tab-pane title="box plot">
        <charts-box-chart-per-station class="chart chart-spacer"
                                      :selection="selection"
                                      :data="data"></charts-box-chart-per-station>
      </sui-tab-pane>
    </sui-tab>
  </sui-container>
</template>

<script>
import ChartsLineChart from "./ChartsLineChart";
import ChartsBoxChartPerStation from "./ChartsBoxChartPerStation";

export default {
  name: "ChartTabs",
  components: { ChartsLineChart, ChartsBoxChartPerStation },
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
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";

#chart-line > div > div.ui.tab.segment.attached.active {
  background: $darkWhite;
}
</style>

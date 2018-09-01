<template>
  <div id="chart-tabs">

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
      <sui-tab-pane title="box plot per month">
        <charts-box-chart-per-month class="chart chart-spacer"
                                    :selection="selection"
                                    :data="data"></charts-box-chart-per-month>
      </sui-tab-pane>
    </sui-tab>
  </div>
</template>

<script>
import ChartsLineChart from "./ChartsLineChart";
import ChartsBoxChartPerStation from "./ChartsBoxChartPerStation";
import ChartsBoxChartPerMonth from "./ChartsBoxChartPerMonth";

export default {
  name: "ChartTabs",
  components: {
    ChartsLineChart,
    ChartsBoxChartPerStation,
    ChartsBoxChartPerMonth
  },
  props: { data: Object, selection: Object },
  methods: {
    handleChange: function(e, activePane, index) {
      if (index === 0) {
        // multi year line
        this.$store.commit("selection/SELECT_SINGLE_YEAR", false);
        this.$store.commit("selection/SET_CHART_TYPE", "LINE_MULTI");
        this.$store.commit("selection/SET_YEAR_RANGE", [
          this.data.startYear,
          this.data.endYear
        ]);
        this.$store.commit("ui/SHOW_YEAR_SELECTION", true);
        this.$ga.event("Select", "Chart-Type", "mutli-year line");
      }
      if (index === 1) {
        // single year line
        this.$store.commit("selection/SELECT_SINGLE_YEAR", true);
        this.$store.commit("selection/SET_CHART_TYPE", "LINE_SINGLE");
        this.$store.commit("selection/SET_YEAR_RANGE", [
          this.data.endYear,
          this.data.endYear
        ]);
        this.$store.commit("ui/SHOW_YEAR_SELECTION", true);
        this.$ga.event("Select", "Chart-Type", "single-year line");
      }
      if (index === 2) {
        // for boxplots don't show year selection
        this.$store.commit("selection/SET_CHART_TYPE", "BOX");
        this.$store.commit("ui/SHOW_YEAR_SELECTION", false);
        this.$ga.event("Select", "Chart-Type", "box plot per station");
      }
      if (index === 3) {
        // for boxplots don't show year selection
        this.$store.commit("selection/SET_CHART_TYPE", "BOX_MONTH");
        this.$store.commit("ui/SHOW_YEAR_SELECTION", false);
        this.$ga.event("Select", "Chart-Type", "box plot per month");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";
#chart-tabs {
  margin-left: 2rem;
}
#chart-tabs > div > div.ui.tab.segment.attached.active {
  background: $darkWhite;
}
</style>

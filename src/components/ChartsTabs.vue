<template>
  <div id="chart-tabs">

    <sui-tab @change="handleChange"
             :active-index.sync="activeIndex"
             v-if="selection.activeParam">
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
  data() {
    return {
      activeIndex: 0
    };
  },
  mounted() {
    const chartType = this.$router.history.current.query.chartType;
    switch (chartType) {
      case "LINE_MULTI":
        this.activeIndex = 0;
        break;
      case "LINE_SINGLE":
        this.activeIndex = 1;
        break;
      case "BOX":
        this.activeIndex = 2;
        break;
      case "BOX_MONTH":
        this.activeIndex = 3;
        break;
    }
  },
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

<style lang="scss" >
@import "../style/style.scss";
#chart-tabs > div > div.ui.tab.segment.attached.active {
  background: $darkWhite;
}
#chart-tabs {
  a.item {
    font-size: 0.75rem;
  }
}
</style>

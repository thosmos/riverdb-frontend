<template>
  <div v-if="data && data.selectedStation"
       class=" ">
    <sui-divider></sui-divider>
    <chart-tabs :data="data"
                :selection="selection"></chart-tabs>
  </div>
</template>

<script>
import ChartTabs from "./ChartsTabs";

import { mapState } from "vuex";

export default {
  name: "ChartWrapper",
  components: { ChartTabs },
  computed: {
    ...mapState({
      ui: state => state.ui,
      selection: state => state.selection,
      data: state => state.data
    })
  }
};
</script>

<style>
.chart-spacer {
  margin: 10px 30px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
</style>

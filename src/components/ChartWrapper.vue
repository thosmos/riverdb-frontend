<template>
  <div v-if="data && data.selectedStation"
       class="ui container fluid">
    <sui-divider></sui-divider>
    <div class="ui grid">
      <div class="ui row">
        <div class="ui column">
          <chart-line :data="data"
                      :selection="selection"></chart-line>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartLine from "./ChartLine";

import { mapState } from "vuex";

export default {
  name: "ChartWrapper",
  components: { ChartLine },
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

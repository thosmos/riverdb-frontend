<template>
  <div class="ui container">
    <h1>Charts</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ChartWrapper",
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
</style>

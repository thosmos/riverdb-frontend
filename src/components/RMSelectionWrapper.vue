<template>
  <div>
    <h1>{{stations && stations.length}}</h1>
  </div>
</template>

<script>
export default {
  name: "RMSelectionWrapper",
  props: {
    stations: Array
  },
  watch: {
    stations: function() {
      this.$store.dispatch("selection/SET_ALL_STATIONS", this.stations);
    }
  }
};
</script>

<style>
</style>

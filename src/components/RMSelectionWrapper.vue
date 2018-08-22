<template>
  <div>
    <h1>SlectionWrapper</h1>
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
      this.$store.commit("selection/SET_ALL_STATIONS", this.stations);
    }
  }
};
</script>

<style>
</style>

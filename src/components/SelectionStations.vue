<template>
  <div>
    <div class="ui centered grid stackable ">
      <div v-for="station in loadedStations"
           :key="station.info.StationID">

        <div class="m-t-md">
          <div class="ui  segment">
            <span>{{station.info.StationName}}</span>
            <sui-icon class="space-left"
                      name="window close"
                      @click="onCloseClick(station.info)" />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectionStations",
  props: {
    loadedStations: Array
  },
  methods: {
    onCloseClick(station) {
      // console.log("station.StationID", station.StationID);
      this.$store.commit("data/REMOVE_STATION", station.StationID);
    }
  }
};
</script>

<style scoped>
.space-left {
  margin-left: 0.5rem;
}
</style>

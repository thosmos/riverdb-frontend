<template>
  <div>
    <div class="ui centered grid stackable ">
      <div v-for="station in loadedStations"
           :key="station.info.StationID">

        <div class="m-t-md">
          <div @click="onSegmentClick(station.info)"
               class="ui segment"
               :class="{active: station.info.StationID === selectedStation.info.StationID}">
            <span>{{station.info.StationName}}</span>
            <sui-icon class="space-left"
                      name="window close"
                      @click="onCloseClick(station.info, $event)" />
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
    loadedStations: Array,
    selectedStation: Object
  },
  methods: {
    onCloseClick: function(station, event) {
      event.stopPropagation();
      // console.log("station.StationID", station.StationID);
      this.$store.dispatch("data/REMOVE_STATION", station.StationID);
    },
    onSegmentClick(station) {
      this.$store.commit("data/SELECT_STATION", station.StationID);
    }
  }
};
</script>

<style scoped>
.space-left {
  margin-left: 0.5rem;
}
.active {
  background: #33bb8b;
  color: white;
}
</style>

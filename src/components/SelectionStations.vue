<template>
  <div id="selection-stations"
       v-if="selectedStation">
    <div class="ui centered grid stackable ">
      <div v-for="station in loadedStations"
           :key="station.info.StationID">

        <div class="m-t-md">
          <div @click="onSegmentClick(station.info)"
               class="ui segment"
               :class="{active: station.info.id === selectedStation.info.id}">

            <span>{{station.info.StationName}}</span>
            <sui-icon class="space-left"
                      name="cancel"
                      @click="onCloseClick(station.info,
               $event)
               " />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { palette1 } from "../assets/chart/palettes.js";

export default {
  name: "SelectionStations",
  props: {
    loadedStations: Array,
    selectedStation: Object
  },
  data() {
    return {
      palette1
    };
  },
  methods: {
    onCloseClick: function(station, event) {
      event.stopPropagation();
      // console.log("station.StationID", station.StationID);
      this.$store.dispatch("data/REMOVE_STATION", station.id);
      this.$ga.event("Remove", "Station", station.id);
    },
    onSegmentClick(station) {
      this.$store.commit("data/SELECT_STATION", station.id);
      this.$ga.event("Select", "Station", station.StationName);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";

#selection-stations {
  .space-left {
    margin-left: 0.5rem;
    cursor: pointer;
  }
  .active {
    font-weight: bold;
    color: $offWhite;
    background: $primaryColor;
  }
  div.ui.segment {
    padding: 0.5rem;
  }
}
</style>

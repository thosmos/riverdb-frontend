<template>
  <div id="selection-stations">
    <div class="ui centered grid stackable ">
      <div v-for="(station,index) in loadedStations"
           :key="station.info.StationID">

        <div class="m-t-md">
          <div @click="onSegmentClick(station.info)"
               class="ui segment"
               :class="{active: station.info.StationID === selectedStation.info.StationID}">

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
      this.$store.dispatch("data/REMOVE_STATION", station.StationID);
      this.$ga.event("Remove", "Station", station.StationName);
    },
    onSegmentClick(station) {
      this.$store.commit("data/SELECT_STATION", station.StationID);
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

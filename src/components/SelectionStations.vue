<template>
  <div>
    <div class="ui centered grid stackable ">
      <div v-for="(station,index) in loadedStations"
           :key="station.info.StationID">

        <div class="m-t-md">
          <div @click="onSegmentClick(station.info)"
               class="ui segment"
               :class="{active: station.info.StationID === selectedStation.info.StationID}"
        
               :style="{border: `2px ${palette[index]} solid` }">
            <span>{{station.info.StationName}}</span>
            <sui-icon class="space-left
               "
                      name="window
               close
               "
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
import { palette } from "../assets/charts.js";

export default {
  name: "SelectionStations",
  props: {
    loadedStations: Array,
    selectedStation: Object
  },
  data() {
    return {
      palette
    };
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

<style lang="scss" scoped>
@import "../style/style.scss";
.space-left {
  margin-left: 0.5rem;
}
.active {
  text-decoration: underline;
  font-weight: bold;
  background: $offWhite;
}
</style>

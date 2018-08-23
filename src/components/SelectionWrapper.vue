<template>
  <div>
    <div class="ui container">
      <sui-message v-if="ui.errorMsg"
                   color="red">
        <p>{{ui.errorMsg}}</p>
      </sui-message>

      <div class="ui two column centered grid">
        <div class="column">
          <multiselect v-model="selectedFork"
                       label="label"
                       placeholder="Select a Fork"
                       @input="forkUpdated"
                       :options="forkOptions"></multiselect>
        </div>

        <div class="column">
          <multiselect :options="stationOptions"
                       placeholder="select a station"
                       label="label"
                       @input="fetchStationData"
                       v-model="selectedStation"></multiselect>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import Multiselect from "vue-multiselect";
import {
  calculateForksForSelection,
  calculateStreamsForSelection,
  calculateStationsForSelection
} from "../utils/selectionUtils.js";

import { GET_STATION_DATA } from "../apollo/queries.js";

import { mapState } from "vuex";

export default {
  name: "SelectionWrapper",
  props: {
    stations: Array
  },
  components: { vSelect, Multiselect },
  data() {
    return {
      selectedStation: null,
      selectedFork: null,
      stationOptions: [],
      forkOptions: []
    };
  },
  computed: {
    ...mapState({
      ui: state => state.ui,
      selection: state => state.selection
    })
  },
  mounted() {
    // Sets allStations in selection vuex but also parses allForks, allWaterbodies etc
    this.$store.dispatch("selection/SET_ALL_STATIONS", this.stations);
    // Initialize forks, streams and stations
    this.forkOptions = calculateForksForSelection(this.selection.allForks);
    this.stationOptions = calculateStationsForSelection(
      this.stations,
      null,
      null
    );
  },
  methods: {
    forkUpdated: function() {
      // selected allForks
      if (!this.selectedFork.value) {
        this.stationOptions = calculateStationsForSelection(
          this.stations,
          null
        );
      } else {
        // selected an actual Fork
        this.stationOptions = calculateStationsForSelection(
          this.stations,
          this.selectedFork
        );
      }
      this.selectedStation = null;
    },

    fetchStationData: function(station) {
      const id = station.value.StationID;
      console.log("id", id);
      // if (!this.loadedStations[id]) {
      this.$apollo
        .query({
          query: GET_STATION_DATA,
          variables: {
            station: id
          }
        })
        .then(res => {
          // this.selected = ""; //NOTE: resets selection, throws error though I do it like in one of the offical codepen example!
          console.log("res", res.data.sitevisits);
          // TODO: reset select field somehow, throws error for this.selected = null
          // if (
          //   find(
          //     this.loadedStations,
          //     o => station.value.StationID === o.station.StationID
          //   )
          // ) {
          //   this.$store.commit("addError", {
          //     type: "selection",
          //     msg: `${station.value.StationName} already selected`
          //   });
          // } else {
          //   this.$store.commit("addStationData", {
          //     station: station.value,
          //     data: res.data.sitevisits
          //   });
          //   this.$store.commit("setStation", station.value);
          // }
        })
        .catch(err => {
          this.$store.commit("ui/SET_ERROR_MSG", `Couldn't fetch station data`);
        });
    }
  }
};
</script>

<style>
</style>

<template>
  <div>
    <div class="ui container">
      <sui-message v-if="ui.errorMsg.selection"
                   color="red">
        <p>{{ui.errorMsg.selection}}</p>
      </sui-message>
      <div class="ui two column centered grid"
           id="selection-boxes">
        <div class="column">
          <multiselect v-model="selectedFork"
                       label="label"
                       placeholder="Select a Fork"
                       @input="forkUpdated"
                       track-by="label"
                       :options="forkOptions"></multiselect>
        </div>

        <div class="column">
          <multiselect :options="sortedStationOptions"
                       placeholder="select a station"
                       label="label"
                       @input="fetchStationData"
                       track-by="label"
                       v-model="selectedStation"></multiselect>
        </div>
      </div>
      <div class="ui grid">
        <div class="column">
          <selection-station-map v-if="stationOptions"
                                 :stations="stationOptions"></selection-station-map>
        </div>
      </div>
      <div v-if="ui.isLoading">
        <Loader />
      </div>
      <selection-stations :loadedStations="data.loadedStations"
                          :selectedStation="data.selectedStation"></selection-stations>
      <div v-if="data.loadedStations.length > 0">
        <selection-params></selection-params>
      </div>
      <div v-if="ui.showYearSelection">
        <!-- only show year selection for line graphs etc not for boxplots -->
        <div v-if="!selection.singleYearSelection">
          <selection-years-range v-if="selection.selectionRange"
                                 :data="data"
                                 :selection="selection"></selection-years-range>
        </div>
        <div v-else>
          <selection-year-single :data="data"
                                 :selection="selection"></selection-year-single>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import SelectionStations from "./SelectionStations";
import SelectionYearsRange from "./SelectionYearsRange";
import SelectionYearSingle from "./SelectionYearSingle";
import SelectionParams from "./SelectionParams";
import SelectionStationMap from "./SelectionStationMap";
import Loader from "./Loader";

import {
  calculateForksForSelection,
  calculateStationsForSelection
} from "../utils/selectionUtils.js";

import { GET_STATION_DATA } from "../apollo/queries.js";

import { mapState } from "vuex";
import find from "lodash/find";
import sortBy from "lodash/sortBy";

export default {
  name: "SelectionWrapper",
  props: {
    stations: Array
  },
  components: {
    Multiselect,
    Loader,
    SelectionStations,
    SelectionParams,
    SelectionYearsRange,
    SelectionYearSingle,
    SelectionStationMap
  },
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
      selection: state => state.selection,
      data: state => state.data
    }),
    sortedStationOptions: function() {
      return sortBy(this.stationOptions, o => o.label);
    }
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
      this.$store.commit("ui/IS_LOADING", true);
      // if (!this.loadedStations[id]) {
      this.$apollo
        .query({
          query: GET_STATION_DATA,
          variables: {
            station: id
          }
        })
        .then(res => {
          this.$store.commit("ui/CLEAR_ERROR_MSG", "selection");
          this.$store.commit("ui/IS_LOADING", false);
          if (find(this.data.loadedStations, o => id === o.info.StationID)) {
            this.$store.commit("ui/SET_ERROR_MSG", {
              section: "selection",
              msg: `Station is already selected`
            });
          } else {
            this.$store.dispatch("data/ADD_STATION_DATA", {
              info: station.value,
              data: res.data
            });
          }
        })
        .catch(err => {
          console.log("err", err);
          this.$store.commit("ui/SET_ERROR_MSG", {
            section: "selection",
            msg: `Couldn't fetch station data`
          });
        });
    }
  }
};
</script>

<style>
#RM
  > div
  > div:nth-child(2)
  > div
  > div:nth-child(1)
  > div
  > div
  > div
  > div.ui.two.column.centered.grid
  > div
  > div {
  z-index: 100000;
}
</style>

<template>
  <div>
    <h1>{{stations && stations.length}}</h1>
    <sui-message v-if="ui.errorMsg"
                 color="red">
      <p>{{ui.errorMsg}}</p>
    </sui-message>
    <div class="ui container">

      <div class="ui two column centered grid">
        <div class="column">
          <multiselect v-model="selectedFork"
                       label="label"
                       placeholder="Select a Fork"
                       :options="forkOptions"></multiselect>
        </div>
        <div class="column">
          <multiselect :options="streamOptions"
                       placeholder="Select a Stream"
                       label="label"
                       v-model="selectedStream"></multiselect>
        </div>
        <div class="column">
          <multiselect :options="stationOption"
                       placeholder="select a station"
                       label="label"
                       v-model="selected"></multiselect>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import Multiselect from "vue-multiselect";

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
      selected: null,
      selectedFork: null,
      selectedStream: null
    };
  },
  computed: {
    ...mapState({
      ui: state => state.ui,
      selection: state => state.selection
    }),
    stationOption: function() {
      return this.stations
        ? this.stations.map(s => {
            return { label: s.StationName, value: s };
          })
        : [];
    },
    forkOptions: function() {
      return this.selection.allForks
        ? this.selection.allForks.map(f => {
            return { label: f, value: f };
          })
        : [];
    },
    streamOptions: function() {
      console.log("stream");
      if (!this.selectedForK) {
        return this.selection.allWaterbodies
          ? this.selection.allWaterbodies.map(b => {
              return { label: b, value: b };
            })
          : [];
      } else {
        let filteredStreams = this.selection.allWaterbodies.filter(b => {
          console.log("b.label", b.label);
          return b === this.selectedFork.name;
        });
        console.log("filteredStreams", filteredStreams);
      }
    }
  },
  mounted() {
    // Sets allStations in selection vuex but also parses allForks, allWaterbodies etc
    this.$store.dispatch("selection/SET_ALL_STATIONS", this.stations);
  },
  methods: {
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

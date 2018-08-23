<template>
  <div>
    <h1>{{stations && stations.length}}</h1>
    <div class="ui two column centered grid">
      <div class="column">

        <v-select :options="stationOption"
                  placeholder="select a station"
                  @input="fetchStationData"
                  v-model="selected"></v-select>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { GET_STATION_DATA } from "../apollo/queries.js";

export default {
  name: "SelectionWrapper",
  props: {
    stations: Array
  },
  components: { vSelect },
  data() {
    return {
      selected: null
    };
  },
  computed: {
    stationOption: function() {
      if (this.stations) {
        return this.stations.map(s => {
          return { label: s.StationName, value: s };
        });
      } else return [];
    }
  },
  watch: {
    stations: function() {
      this.$store.dispatch("selection/SET_ALL_STATIONS", this.stations);
    }
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
          this.selected = null; //NOTE: resets selection, throws error though I do it like in one of the offical codepen example!
          console.log("res", res.data.sitevisits);
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
          console.log("err", err);
        });
    }
  }
};
</script>

<style>
</style>

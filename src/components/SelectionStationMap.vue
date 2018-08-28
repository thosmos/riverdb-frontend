<template>
  <div v-if="bounds"
       id='selection-map'
       class="m-b-lg">
    <l-map :bounds="bounds"
           class="map-height">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker v-for="marker in cleanedStations"
                :key="marker.value.StationID"
                :lat-lng="getPosition(marker.value)"
                :icon=icon>
        <l-popup class="popup">
          <h6>
            <b>{{marker.value.StationName}}</b>
          </h6>
          <p>on {{marker.value.LocalWaterbody}}</p>
          <sui-button color="blue"
                      @click="addStation(marker.value)">Add Station</sui-button>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LGeoJson, LMarker, LPopup } from "vue2-leaflet";
import { calculateBoundsOfStations } from "../utils/geo.js";
import L from "leaflet";
import icon from "../assets/GIS/red-map-icon.png";
import { GET_STATION_DATA } from "../apollo/queries.js";
import { mapState } from "vuex";

export default {
  name: "SelectionStationMap",
  props: {
    stations: Array
  },
  components: { LMap, LTileLayer, LGeoJson, LMarker, LPopup },
  data() {
    return {
      icon: L.icon({
        iconUrl: icon,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -20]
      })
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      data: state => state.data
    }),
    cleanedStations: function() {
      return this.stations.filter(s => {
        if (!s.value.TargetLat) {
        }
        return s.value.TargetLat && s.value.TargetLong;
      });
    },
    bounds: function() {
      return calculateBoundsOfStations(this.stations);
    }
  },
  methods: {
    getPosition: function(m) {
      if (m.TargetLat && m.TargetLong) {
        let position = L.latLng(m.TargetLat, m.TargetLong);
        return position;
      } else {
      }
    },
    addStation: function(station) {
      // TODO: Duplicate code from SelectionWrapper fetchStationData, make an action out of it....
      const id = station.StationID;
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
              info: station,
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

<style lang="scss" scoped>
.map-height {
  height: 500px;
  border-radius: 6px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
#selection-map
  > div
  > div.leaflet-control-container
  > div.leaflet-top.leaflet-left
  > div {
  z-index: 10;
}
.popup {
  p {
    font-size: 0.8rem;
    margin: 5px 0;
  }
  h6 {
    padding-bottom: 0px;
    margin-bottom: 0px;
    font-size: 1rem;
  }
  button {
    font-size: 0.8rem;
    display: block;
    margin: 0 auto;
  }
}
</style>

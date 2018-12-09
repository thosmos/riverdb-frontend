<template>
  <div v-if="bounds"
       id='selection-map'
       class="m-b-lg">
    <l-map :bounds="bounds"
           class="map-height"
           :options="options">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker v-for="marker in cleanedStations"
                :key="marker.value.StationID"
                :lat-lng="getPosition(marker.value)"
                :options="markerOptions(marker)"
                :icon="getIcon(marker.value.StationID)">
        <l-popup class="popup">
          <h6>
            <b>{{marker.value.StationName}}</b>
          </h6>
          <p>on {{marker.value.LocalWaterbody}}</p>
          <sui-button color="blue"
                      basic
                      fluid
                      @click="stationInfo(marker.value)">Station Info</sui-button>
          <div v-if="isLoaded(marker)">
            <sui-button color="red"
                        fluid
                        @click="removeStation(marker.value)">Remove Station</sui-button>
          </div>
          <div v-else>
            <sui-button color="blue"
                        fluid
                        @click="addStation(marker.value)">Add Station</sui-button>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LGeoJson, LMarker, LPopup } from "vue2-leaflet";
import { calculateBoundsOfStations } from "../utils/geo.js";
import L from "leaflet";
// import icon from "../assets/GIS/red-map-icon.png";
import icon from "../assets/GIS/map-marker-2-64.png";
import selectedIcon from "../assets/GIS/map-icon.png";
import { mapState } from "vuex";
import findIndex from "lodash/findIndex";

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
      }),
      loadedStationIcon: L.icon({
        iconUrl: selectedIcon,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -20]
      }),
      // map options, disables scrolling with mouse wheel
      options: {
        scrollWheelZoom: false,
        touchZoom: true,
        dragging:
          !(typeof window.orientation !== "undefined") ||
          navigator.userAgent.indexOf("IEMobile") !== -1,
        tap: false
      }
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      data: state => state.data
    }),
    cleanedStations: function() {
      return this.stations.filter(s => {
        return s.value.TargetLat && s.value.TargetLong;
      });
    },
    bounds: function() {
      return calculateBoundsOfStations(this.stations);
    }
  },
  methods: {
    markerOptions: function(station) {
      return {
        opacity: station.value.Active ? 1 : 0.5,
        riseOnHover: true,
        title: station.value.StationName
      };
    },
    getPosition: function(m) {
      if (m.TargetLat && m.TargetLong) {
        let position = L.latLng(m.TargetLat, m.TargetLong);
        return position;
      }
    },
    getIcon: function(id) {
      let index = findIndex(
        this.data.loadedStations,
        o => o.info.StationID === id
      );
      if (index !== -1) {
        return this.loadedStationIcon;
      } else {
        return this.icon;
      }
    },
    addStation: function(station) {
      this.$store.dispatch("data/FETCH_STATION_DATA", station);
    },
    removeStation: function(station) {
      this.$store.dispatch("data/REMOVE_STATION", station.StationID);
    },
    stationInfo: function(station) {
      this.$store.commit("ui/TOGGLE_STATION_INFO_MODAL", station);
    },
    isLoaded: function(station) {
      let index = findIndex(this.data.loadedStations, o => {
        return o.info.StationID === station.value.StationID;
      });
      return index === -1 ? false : true;
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
    margin: 10px auto;
  }
}
</style>

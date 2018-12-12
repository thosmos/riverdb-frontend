<template>
  <div id="station-info-modal">
    <l-map :options="options"
           :bounds="bounds"
           id="map"
           class="map-height"
           ref="map">
      <l-control-layers position="topright" />
      <l-tile-layer v-for="tileProvider in tileProviders"
                    layerType="base"
                    :name="tileProvider.name"
                    :url="tileProvider.url"
                    :attribution="tileProvider.attribution"
                    :visible="tileProvider.visible"
                    :key="tileProvider.name" />
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <!-- Catchment outline -->
      <l-geo-json v-if="watershed"
                  ref='outline'
                  :geojson="watershed.catchmentInfo.shape"></l-geo-json>
      <l-geo-json v-for="(ut,index) in watershed.upstreamInfo.paths"
                  :key="index"
                  :geojson="ut.shape"
                  ref="upstreamRef"
                  :options="upstreamOptions">
      </l-geo-json>
      <l-geo-json v-for="(dt,index) in watershed.downstreamInfo.paths"
                  :key="index+10000"
                  :geojson="dt.shape">
      </l-geo-json>
      <l-marker v-if="watershed"
                :icon="icon"
                :options="markerOptions(station)"
                :lat-lng="getPosition(station)"></l-marker>
    </l-map>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LGeoJson,
  LMarker
} from "vue2-leaflet";
import geolib from "geolib";
import L from "leaflet";
import icon from "../assets/GIS/map-marker-2-64.png";
import {
  tribStyleWithName,
  tribStyleWithoutName
} from "../assets/constants.js";
import { tileProviders } from "../assets/tileProviders.js";

export default {
  name: "StationInfoMap",
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LGeoJson,
    LMarker
  },
  props: {
    watershed: Object,
    station: Object
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      map: null,
      options: {
        // scrollWheelZoom: false,
        // touchZoom: true,
        // dragging:
        //   !(typeof window.orientation !== "undefined") ||
        //   navigator.userAgent.indexOf("IEMobile") !== -1,
        // tap: false
      },
      tileProviders,
      icon: L.icon({
        iconUrl: icon,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -20]
      }),
      bounds: null
    };
  },
  mounted() {
    this.bounds = this.getNewBounds(this.watershed);
  },
  computed: {
    upstreamOptions: function() {
      let oef = {
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: e => {
              var layer = e.target;
              if (e.target.feature.geometry.properties.name) {
                layer
                  .bindTooltip(`${e.target.feature.geometry.properties.name}`, {
                    sticky: true
                  })
                  .openTooltip();
              } else {
                layer
                  .bindTooltip(
                    `comid: ${e.target.feature.geometry.properties.comid}`,
                    { sticky: true }
                  )
                  .openTooltip();
              }
            },
            mouseout: e => {
              e.target.closePopup();
            }
          });
        },
        style: feature => {
          if (feature.geometry.properties.name) {
            return tribStyleWithName;
          } else {
            return tribStyleWithoutName;
          }
        }
      };
      return { ...oef };
    }
  },
  methods: {
    getNewBounds: function(watershed) {
      if (watershed) {
        let shape = watershed.catchmentInfo.shape.coordinates[0];
        let nb = geolib.getBounds(shape);
        return L.latLngBounds(
          L.latLng(nb.maxLat, nb.maxLng),
          L.latLng(nb.minLat, nb.minLng)
        );
      } else return null;
    },
    getPosition: function(m) {
      if (m.TargetLat && m.TargetLong) {
        let position = L.latLng(m.TargetLat, m.TargetLong);
        return position;
      }
    },
    markerOptions: function(station) {
      return {
        title: `${station.StationName} monitoring station`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";
#map {
  height: 500px;
  width: 100%;
  border-radius: 6px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}
</style>

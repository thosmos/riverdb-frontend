<template>
  <div id="station-info-modal">
    <l-map :options="options"
           :bounds="bounds"
           id="map"
           class="map-height"
           ref="map">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <!-- Catchment outline -->
      <l-geo-json v-if="watershed"
                  ref='outline'
                  :geojson="watershed.catchmentInfo"></l-geo-json>
      <!-- <l-geo-json v-for="(ut,index) in ws.upstreamInfo.paths"
                  :key="index"
                  :geojson="ut.shape"
                  ref="upstreamRef"
                  :options="upstreamOptions">
      </l-geo-json> -->
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LGeoJson, LMarker } from "vue2-leaflet";
import geolib from "geolib";
import L from "leaflet";

export default {
  name: "StationInfoMap",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker
  },
  props: {
    watershed: Object
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
      bounds: null
    };
  },
  mounted() {
    console.log("this.watershed", this.watershed);
    console.log(
      "getNewBounds(this.watershed()",
      this.getNewBounds(this.watershed)
    );
    this.bounds = this.getNewBounds(this.watershed);
  },
  methods: {
    getNewBounds: function(watershed) {
      if (watershed) {
        let shape = watershed.catchmentInfo.coordinates[0];
        let nb = geolib.getBounds(shape);
        return L.latLngBounds(
          L.latLng(nb.maxLat, nb.maxLng),
          L.latLng(nb.minLat, nb.minLng)
        );
      } else return null;
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

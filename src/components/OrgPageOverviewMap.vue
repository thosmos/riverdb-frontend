<template>
  <div class="m-t-lg m-b-lg map-height"
       v-if="bounds">
    <l-map :bounds="bounds"
           id="map"
           ref="map">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>

    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LGeoJson, LMarker } from "vue2-leaflet";
import geolib from "geolib";

import { mapState } from "vuex";

export default {
  name: "OrgPageOverviewMap",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    };
  },
  mounted() {
    // Fetch organizations watershed
    this.$store.dispatch(
      "organization/fetchOrganizationWatershed",
      this.$route.params.org
    );
  },
  computed: {
    ...mapState({
      ws: state => state.organization.watershed
    }),
    bounds: function() {
      if (this.ws && this.ws.bounds) {
        // Calculate new bounds
        let shape = this.ws.catchmentInfo.shape.coordinates[0];
        let nb = geolib.getBounds(shape);
        return L.latLngBounds(
          L.latLng(nb.maxLat, nb.maxLng),
          L.latLng(nb.minLat, nb.minLng)
        );
      } else {
        // console.log('this.wsbounds',this.ws.bounds)
        return null;
      }
    }
  }
};
</script>

<style lang="scss">
.map-height {
  height: 500px;
  border-radius: 6px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}
</style>

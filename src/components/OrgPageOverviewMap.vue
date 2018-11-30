<template>
  <div class="m-t-lg m-b-xl map-height"
       v-if="bounds">
    <l-map :bounds="bounds"
           :options="options"
           id="map"
           ref="map">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <!-- Catchment outline -->
      <l-geo-json ref='outline'
                  :geojson="ws.catchmentInfo.shape"></l-geo-json>
      <l-geo-json v-for="(ut,index) in ws.upstreamInfo.paths"
                  :key="index"
                  :geojson="ut.shape"
                  ref="upstreamRef"
                  :options="upstreamOptions">
      </l-geo-json>
    </l-map>
    <sui-message>
      <sui-message-header>

        <p id="inside-map">For a more interactive view of the whole watershed
          go to
          <a :href="externalLink"
             target="_blank
         ">watershedmap.org</a>
        </p>
      </sui-message-header>
    </sui-message>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script>
import { LMap, LTileLayer, LGeoJson, LMarker } from "vue2-leaflet";
import Loader from "./Loader";
import {
  tribStyleWithName,
  tribStyleWithoutName
} from "../assets/constants.js";
import geolib from "geolib";
import L from "leaflet";

import { mapState } from "vuex";

export default {
  name: "OrgPageOverviewMap",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
    Loader
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      map: null,
      options: {
        scrollWheelZoom: false
      }
    };
  },
  mounted() {
    // Fetch organizations watershed
    this.$store.dispatch(
      "organization/FETCH_ORGANIZATION_WATERSHED",
      this.$route.params.org
    );
  },
  computed: {
    ...mapState({
      ws: state => state.organization.watershed
    }),
    // Bounds of map from watershed
    externalLink: function() {
      return `https://watershedmap.org/${this.$route.params.org}`;
    },
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
    },
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
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";
.map-height {
  height: 500px;
  border-radius: 6px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}
#inside-map {
  z-index: 100000;
}
#inside-map > a {
  color: $primaryColor;
}
</style>

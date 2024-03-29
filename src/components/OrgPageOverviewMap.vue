<template>
  <div class="m-t-md m-b-md "
       v-if="bounds">
    <l-map :bounds="bounds"
           :options="options"
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
    <div class="wsm-info">
      <p id="inside-map">For a more interactive view of the whole watershed
        go to
        <a :href="externalLink"
           target="_blank
         ">watershedmap.org</a>
      </p>
    </div>
  </div>
  <div v-else>
    <!-- <Loader /> -->
    <Skeleton id="map" />
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
import Loader from "./Loader";
import Skeleton from "./Skeleton";
import {
  tribStyleWithName,
  tribStyleWithoutName
} from "../assets/constants.js";
import { tileProviders } from "../assets/tileProviders.js";
import geolib from "geolib";
import L from "leaflet";

import { mapState } from "vuex";

export default {
  name: "OrgPageOverviewMap",
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LGeoJson,
    LMarker,
    Loader,
    Skeleton
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      map: null,
      options: {
        scrollWheelZoom: false,
        touchZoom: true,
        dragging:
          !(typeof window.orientation !== "undefined") ||
          navigator.userAgent.indexOf("IEMobile") !== -1,
        tap: false
      },
      tileProviders
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

<style lang="scss" scoped>
@import "../style/style.scss";
#map {
  height: 500px;
  border-radius: 6px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}
#inside-map {
  /* z-index: 100000; */
}
#inside-map > a {
  color: $primaryColor;
}
.wsm-info {
  margin: 1.5rem 1rem;
  display: flex;
  justify-content: center;
  p {
    font-size: 1.1rem;
    text-decoration: underline;
    text-align: center;
  }
}
</style>

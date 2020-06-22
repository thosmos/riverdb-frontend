<template>
  <div v-if="bounds" class="m-t-md m-b-lg">
    <l-map :bounds="bounds" class="map-height" :options="options">
      <l-control-layers position="topright" />
      <l-tile-layer
        v-for="tileProvider in tileProviders"
        layerType="base"
        :name="tileProvider.name"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        :visible="tileProvider.visible"
        :key="tileProvider.name"
      />
      <!-- <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer> -->
      <div v-for="org in organizations" :key="org.river">
        <l-geo-json :geojson="org.outline" :options="wsOptions(org)"></l-geo-json>
      </div>
    </l-map>
    <organization-map-color-index :organizations="organizations" />
  </div>
  <div v-else>
    <Skeleton class="map-height m-t-lg m-b-lg"></Skeleton>
  </div>
</template>

<script>
//import organizations from "../assets/organizations.js";
import agencyAreas from "../assets/GIS/agencyAreas.js";
import { yuba, deer, wolf } from "../assets/GIS/watersheds";
import Vue from "vue";
import OrganizationMapColorIndex from "./organizationMapColorIndex";
import Skeleton from "./Skeleton";

import {
  LMap,
  LTileLayer,
  LControlLayers,
  LGeoJson,
  LMarker
} from "vue2-leaflet";
import Popup from "./OrganizationsMapPopup.vue";
import L from "leaflet";
import axios from "axios";
import find from "lodash/find";
import geolib from "geolib";
import { WS_API_IP, WS_API_PORT } from "../assets/constants";
import { tileProviders } from "../assets/tileProviders";

function onEachFeature(feature, layer) {
  let popupContent = Vue.extend(Popup);
  let popup = new popupContent({
    propsData: {
      route: feature.properties.route,
      river: feature.properties.organization
    }
  });
  layer.bindPopup(popup.$mount().$el);
}

export default {
  name: "OrganizationsMap",
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LGeoJson,
    LMarker,
    OrganizationMapColorIndex,
    Skeleton
  },
  data: function() {
    return {
      organizations: [
        { name: "SYRCL", long:"South Yuba River Citizen's League", outline: yuba, options: agencyAreas[0] },
        { name: "SSI", outline: deer, options: agencyAreas[2] },
        { name: "WCCA", outline: wolf, options: agencyAreas[1] }
      ],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
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
    // let nb = geolib.getBounds(
    //   this.organizations[0].outline.geometry.coordinates[0]
    // );
  },
  methods: {
    wsOptions: function(org) {
      return { ...org.options, onEachFeature };
    }
  },
  computed: {
    bounds() {
      return [
        [39.1, -121.6],
        [39.7, -120.4]
      ];
      set: {
        return null;
      }
    }
  }
};
</script>

<style scoped>
.map-height {
  height: 500px;
  border-radius: 6px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
</style>

<template>
  <div v-if="bounds"
       class="m-t-lg m-b-lg">
    <l-map :bounds="bounds"
           class="map-height"
           :options="options">
      <l-control-layers position="topright" />
      <l-tile-layer v-for="tileProvider in tileProviders"
                    layerType="base"
                    :name="tileProvider.name"
                    :url="tileProvider.url"
                    :attribution="tileProvider.attribution"
                    :visible="tileProvider.visible"
                    :key="tileProvider.name" />
      <!-- <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer> -->
      <div v-for="org in organizations"
           :key="org.river">
        <l-geo-json :geojson="org.outline"
                    :options="wsOptions(org)"></l-geo-json>
      </div>
    </l-map>
    <organization-map-color-index :organizations="organizations" />
  </div>
  <div v-else>
    <Skeleton class="map-height m-t-lg m-b-lg"></Skeleton>
  </div>
</template>

<script>
import organizations from "../assets/organizations.js";
import agencyAreas from "../assets/GIS/agencyAreas.js";
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
      text: feature.properties.abbreviation,
      river: feature.properties.river
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
      organizations: [],
      bounds: null,
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
    let url =
      process.env.NODE_ENV === "development"
        ? `http://localhost:${WS_API_PORT}`
        : `http://${WS_API_IP}:${WS_API_PORT}`;
    let orgs = organizations.map(o => {
      return axios.get(`${url}/outline?river=${o.abbreviation}`);
    });
    axios
      .all(orgs)
      .then(res => {
        let combinedLocations = [];
        this.organizations = res.map(r => {
          let options = find(agencyAreas, o => r.data.info.river === o.agency);
          let info = find(
            organizations,
            o => r.data.info.river === o.abbreviation
          );
          // Adding info like organization name to outline goeJSON
          r.data.info.outline.properties = info;
          // Adding to combined locations
          combinedLocations = combinedLocations.concat(
            r.data.info.outline.geometry.coordinates[0]
          );
          return { ...r.data.info, options };
        });
        let nb = geolib.getBounds(combinedLocations);
        this.bounds = L.latLngBounds(
          L.latLng(nb.maxLat, nb.maxLng),
          L.latLng(nb.minLat, nb.minLng)
        );
      })
      .catch(err => {
        console.log("err", err);
      });
  },
  methods: {
    wsOptions: function(org) {
      return { ...org.options, onEachFeature };
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

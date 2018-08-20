<template>
  <div v-if="bounds"
       class="m-t-lg m-b-lg">
    <l-map :bounds="bounds"
           class="map-height">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <div v-for="org in organizations"
           :key="org.river">
        <l-geo-json :geojson="org.outline"
                    :options="wsOptions(org)"></l-geo-json>
      </div>
    </l-map>
  </div>
</template>

<script>
import organizations from "../assets/organizations.js";
import agencyAreas from "../assets/GIS/agencyAreas.js";
// import { watersheds } from "../../assets/GIS";
import Vue from "vue";

import { calculateBounds, calculateCenterOfGeoJson } from "../utils/geo.js";
import { LMap, LTileLayer, LGeoJson, LMarker } from "vue2-leaflet";
import Popup from "./OrganizationsMapPopup.vue";
import L from "leaflet";
import axios from "axios";
import find from "lodash/find";
import geolib from "geolib";

function onEachFeature(feature, layer) {
  console.log("feature", feature);
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
  components: { LMap, LTileLayer, LGeoJson, LMarker },
  data: function() {
    return {
      organizations: [],
      zoom: 9,
      // center: calculateCenterOfGeoJson(agencyAreas),
      // maxBounds: calculateBounds(agencyAreas),
      bounds: null,
      center: [39.03, -121, 13],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    };
  },
  mounted() {
    console.log("mounted");
    let orgs = organizations.map(o => {
      return axios.get(`http://localhost:3010/outline?river=${o.abbreviation}`);
    });
    axios
      .all(orgs)
      .then(res => {
        console.log("t", res);
        let combinedLocations = [];
        this.organizations = res.map(r => {
          let options = find(agencyAreas, o => r.data.info.river === o.agency);
          let info = find(
            organizations,
            o => r.data.info.river === o.abbreviation
          );
          console.log("r.data.info", r.data.info);
          console.log("options", options);
          console.log("info", info);
          // Adding info like organization name to outline goeJSON
          r.data.info.outline.properties = info;
          // Adding to combined locations
          combinedLocations = combinedLocations.concat(
            r.data.info.outline.geometry.coordinates[0]
          );
          return { ...r.data.info, options };
        });
        let nb = geolib.getBounds(combinedLocations);
        console.log("nb", nb);
        this.bounds = L.latLngBounds(
          L.latLng(nb.maxLat, nb.maxLng),
          L.latLng(nb.minLat, nb.minLng)
        );
        console.log("newBounds", this.bounds);
      })
      .catch(err => {
        console.log("err", err);
      });
  },
  methods: {
    // wsBoundaries: function(index) {
    //   return watersheds[index].features[0];
    //   // return agencyAreas.features[index];
    // },
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

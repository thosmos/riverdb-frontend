<template>
  <div class="m-t-lg m-b-lg">
    <l-map :center="center"
           :zoom="zoom"
           class="map-height">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <!-- <div v-for="i in 2"
               :key="i">
            <l-geo-json :geojson="wsBoundaries(i-1)"
                        :options="wsOptions(i-1)"></l-geo-json>
          </div> -->
    </l-map>
  </div>
</template>

<script>
import { agencyAreas } from "../assets/GIS/agencyAreas.js";
// import { watersheds } from "../../assets/GIS";
import Vue from "vue";

import { calculateBounds, calculateCenterOfGeoJson } from "../utils/geo.js";
import { LMap, LTileLayer, LGeoJson, LMarker } from "vue2-leaflet";
// import Popup from "./PopUp.vue";
import L from "leaflet";

// function onEachFeature(feature, layer) {
//   let popupContent = Vue.extend(Popup);
//   let popup = new popupContent({
//     propsData: {
//       text: feature.properties.Name,
//       size: feature.properties.size,
//       agency: feature.properties.agency
//     }
//   });
//   layer.bindPopup(popup.$mount().$el);
// }

export default {
  name: "OrganizationsMap",
  components: { LMap, LTileLayer, LGeoJson, LMarker },
  data: function() {
    return {
      zoom: 9,
      // center: calculateCenterOfGeoJson(agencyAreas),
      // maxBounds: calculateBounds(agencyAreas),
      // bounds: calculateBounds(agencyAreas),
      center: [39.03, -121, 13],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    };
  },
  methods: {
    // wsBoundaries: function(index) {
    //   return watersheds[index].features[0];
    //   // return agencyAreas.features[index];
    // },
    // wsOptions: function(index) {
    //   return { ...watersheds[index].properties, onEachFeature };
    // }
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

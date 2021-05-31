<template>
  <div v-if="bounds"
       id='selection-map'
       >
       <!-- class="m-b-lg" -->
    <div v-if="safeOptions" id="safetoswim-legend">
      <div class="div-icon unsafe" /> Recently Unsafe <br>
      Last measured safe: <br>
      <div class="div-icon under7" /> within 7 days <br>
      <div class="div-icon under14" /> within 14 days <br>
      <div class="div-icon under30" /> within 30 days <br>
      <div class="div-icon under365" /> within 1 year <br>
      <div class="div-icon over365" /> over 1 year ago<br>
    </div>
    <l-map :bounds="bounds"
           class="map-height"
           :options="options">
      <l-control-layers position="topright" />
      <l-tile-layer v-for="tileProvider in tileProviders"
                    layerType="base"
                    :name="tileProvider.name"
                    :url="tileProvider.url"
                    :visible="tileProvider.visible"
                    :attribution="tileProvider.attribution"
                    :key="tileProvider.name" />
      <l-marker v-for="marker in cleanedStations"
                :key="marker.value.StationCode"
                :lat-lng="getPosition(marker.value)"
                :options="markerOptions(marker)"
                :icon="getIcon(marker.value.StationCode, marker.value.latest)">
        <l-popup class="popup">
          <h6>
            <b>{{marker.value.StationName}}</b>
          </h6>
          <p>on {{marker.value.LocalWaterbody}}</p>
          <div v-if="safeOptions">
            <p>
              Agency: 
              <router-link :to="`/${marker.value.Agency.AgencyCode}`">
                {{marker.value.Agency.AgencyCode}}
              </router-link>
            </p>
            <!-- <p>Analyte: {{safeOptions.analyte}}</p> -->
            <p>Latest: {{format(Number(marker.value.latest.date), 'M/D/YYYY')}}</p>
            <p>Value: {{marker.value.latest.value}} MPN/100mL </p>

          </div>
          <sui-button v-if="safeOptions" 
                      color="blue"
                      basic
                      fluid
                      @click="safetoswimChart(marker.value)">Historical Chart</sui-button>

          <sui-button v-if="!safeOptions" 
                      color="blue"
                      basic
                      fluid
                      @click="stationInfo(marker.value)">Station Info</sui-button>

          <div v-if="!safeOptions">
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
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LGeoJson,
  LMarker,
  LPopup
} from "vue2-leaflet";
import { calculateBoundsOfStations } from "../utils/geo.js";
import L from "leaflet";
import icon from "../assets/GIS/marker-icon-2x-blue.png";
import selectedIcon from "../assets/GIS/marker-icon-2x-black.png";
import redIcon from "../assets/GIS/marker-icon-2x-red.png";
import greenIcon from "../assets/GIS/marker-icon-2x-green.png";
import { tileProviders } from "../assets/tileProviders.js";
import { mapState } from "vuex";
import findIndex from "lodash/findIndex";
import {subWeeks, format, formatDistance, formatRelative, subDays } from 'date-fns';

const genIcon = (color) => {
  return L.divIcon({
            className: '',
            html: `<div class='div-icon ${color}'/>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6]
          })  
}

export default {
  name: "SelectionStationMap",
  props: {
    stations: Array,
    safeOptions: Object
  },
  components: { LMap, LTileLayer, LControlLayers, LGeoJson, LMarker, LPopup },
  data() {
    return {

      icon: L.icon({
        iconUrl: icon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      }),
      loadedStationIcon: L.icon({
        iconUrl: selectedIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      }),

      tileProviders,
      // map options
      options: {
        scrollWheelZoom: true,
        touchZoom: true,
        dragging: true,
          // !(typeof window.orientation !== "undefined") ||
          // navigator.userAgent.indexOf("IEMobile") !== -1,
        tap: false
      }
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      data: state => state.data,
      ui: state => state.ui
    }),
    cleanedStations: function() {
      return this.stations.filter(s => {
        return s.value.TargetLat && s.value.TargetLong;
      });
    },
    bounds: function() {
      return calculateBoundsOfStations(this.stations);
    },
    chartOptions: function() {
      console.log("SelectionStationMap.chartOptions")
      let minMax = getMinMaxValue(this.plotData);
      const options = {
        chart: {
          type: "spline",
          zoomType: 'xy"'
        },
        ...graphConfig,
        ...multiStation(this.data.loadedStations, this.selection.activeParam),
        xAxis: [
          {
            type: "datetime",
            title: {
              text: "Date"
            }
          }
        ],
        yAxis: [
          {
            // endOnTick: false,
            // startOnTick: false,
            title: {
              text:
                getFullParamName(this.selection.activeParam) +
                getUnit(this.selection.activeParam)
            },
            plotLines: getParamInfoLine(this.selection.activeParam),
            min: minMax[0],
            max: minMax[1]
          },
          { ...this.secondaryAxis() }
        ],
        tooltip: {
          shared: true
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: true,
              radius: 2.5,
              symbol: "circle"
            },
            lineWidth: 1.5
          },
          series: {
            animation: false
          }
        },

        colors: palette1,
        series: this.plotData,
        exporting: {
          filename: `line chart ${this.selection.activeParam} ${
            this.getYearRange
          }`
        }
      };
      console.log("CHART OPTIONS", options);
      return options;
    }
  },
  methods: {
    format,
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
    getIcon: function(id, safeValue) {
      let index = findIndex(
        this.data.loadedStations,
        o => o.info.StationCode === id
      );
      if (index !== -1) {
        return genIcon('icon-loaded');
      } else {
        if(safeValue )
        {
          let safety = 'over365';
          if(safeValue.isHigh){
            safety = 'unsafe';
          }
          else if(safeValue.date){
            const dt = new Date(Number(safeValue.date))
            const now = new Date();
            const days7 = subDays(now, 7);
            const days14 = subDays(now, 14);
            const days30 = subDays(now, 30);
            const days365 = subDays(now, 365);

            if(dt > days7)
              safety = 'under7'
            else if (dt > days14)
              safety = 'under14'
            else if (dt > days30)
              safety = 'under30'
            else if (dt > days365)
              safety = 'under365'

          }
          return genIcon(safety);

        }
        else
          return genIcon('icon-normal');
      }
    },
    addStation: function(station) {
      this.$store.dispatch("data/FETCH_STATION_DATA", station);
    },
    removeStation: function(station) {
      this.$store.dispatch("data/REMOVE_STATION", station.StationCode);
    },
    stationInfo: function(station) {
      // this.$store.commit(
      //   "organization/SET_ACTIVE_ORGANIZATION",
      //   station.Agency.AgencyCode
      // );
      this.$store.commit("ui/TOGGLE_STATION_INFO_MODAL", station);
    },
    safetoswimChart: function(station) {
      // this.$store.commit(
      //   "organization/SET_ACTIVE_ORGANIZATION",
      //   station.Agency.AgencyCode
      // );
      this.$store.commit("ui/TOGGLE_SAFETOSWIM_MODAL", station);
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

<style lang="scss">

.div-icon {
  width:12px; 
  height:12px; 
  border: 1px solid #444; 
  border-radius:50%;
  display: inline-block;
}
.under7 {
  background-color: #224E99;
}
.under14 {
  background-color: #198EBA;
}
.under30 {
  background-color: #19BDC9;
}
.under365 {
  background-color: #A1DCBD;
}
.over365 {
  background-color: #FEFDE6;
}
.unsafe {
  background-color: red;
}
.icon-normal {
  background-color: #2A7EC7;
}
.icon-loaded {
  background-color: #333;
}
</style>

<style lang="scss" scoped>

#safetoswim-legend {
  position: absolute;
  z-index: 999;
  background-color: white;
  bottom: 30px;
  left: 30px;
  padding: 10px;
  font-size: small;
}

.safe-height {
  height: 700px;
}

.map-height {
  height: 600px;
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

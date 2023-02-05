<template>
  <div>
    <div class="">
      <sui-message v-if="ui.errorMsg.selection"
                   color="red">
        <p>{{ui.errorMsg.selection}}</p>
      </sui-message>
      <div class="ui grid">
        <div class="column"
             id="step-3">
          <selection-station-map v-if="stationOptions"
                                 id='station-map'
                                 :stations="stationOptions"
                                 :safeOptions="safeOptions"></selection-station-map>
        </div>
      </div>
      <div class="ui two column centered grid"
           :class="[ui.showInfoModal ? 'hide-multiselect' : '']"
           id="selection-boxes">
        
        <!-- <div
            v-if="!safeOptions" 
            class="column"
            id="step-0">
          <multiselect v-model="selectedFork"
                      id="select-1"
                      label="fullName"
                      placeholder="Select a Fork"
                      @input="forkUpdated"
                      track-by="fullName"
                      :options="forkOptions"></multiselect>
        </div> -->
        <div
            v-if="!safeOptions" 
            class="column"
            id="step-0">
          <multiselect v-model="selectedProject"
                      :allow-empty="false"
                      deselect-label="Selected"
                      id="select-0"
                      label="Name"
                      placeholder="Select a Project"
                      @input="projectUpdated"
                      track-by="ProjectID"
                      :options="projects"></multiselect>
        </div>
        <!-- <div
            v-if="!safeOptions" 
            class="column"
            id="step-1">
          <multiselect v-model="selectedSampleType"
                      :allow-empty="false"
                      deselect-label="Selected"
                      id="select-2"
                      label="label"
                      placeholder="Select a Sample Type"
                      @input="sampleTypeUpdated"
                      track-by="value"
                      :options="sampleTypeOptions"></multiselect>
        </div> -->
        <div v-if="!safeOptions"
            class="column"
            id="step-2">
          <multiselect :options="sortedStationOptions"
                      id="select-3"
                      placeholder="Select a Station"
                      label="label"
                      @input="fetchStationData"
                      track-by="label"
                      v-model="selectedStation"></multiselect>
        </div>
      </div>
      
      <div v-if="ui.isLoading">
        <Loader />
      </div>
      <div v-if="!safeOptions" 
           id="step-4"
           class="m-b-lg">
        <selection-stations :loadedStations="data.loadedStations"
                            :selectedStation="data.selectedStation"></selection-stations>
      </div>
      <div id="step-6" 
           v-if="ui.showYearSelection && !safeOptions">
        <!-- only show year selection for line graphs etc not for boxplots -->
        <div v-if="!selection.singleYearSelection">
          <selection-years-range v-if="selection.selectionRange"
                                 :data="data"
                                 :selection="selection"></selection-years-range>
        </div>
        <div v-else>
          <selection-year-single :data="data"
                                 :selection="selection"></selection-year-single>
        </div>
      </div>
      <div id="step-5"
           v-if="data.loadedStations && data.loadedStations.length > 0 && !safeOptions">
        <selection-params></selection-params>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import SelectionStations from "./SelectionStations";
import SelectionYearsRange from "./SelectionYearsRange";
import SelectionYearSingle from "./SelectionYearSingle";
import SelectionParams from "./SelectionParams";
import SelectionStationMap from "./SelectionStationMap";
import Loader from "./Loader";

import {
  calculateForksForSelection,
  calculateStationsForSelection,
  calcStationOption
} from "../utils/selectionUtils.js";

import { mapState } from "vuex";
import sortBy from "lodash/sortBy";
import uniq from "lodash/uniq";

export default {
  name: "SelectionWrapper",
  props: {
    stations: Array,
    safeOptions: Object,
    projects: Array
  },
  components: {
    Multiselect,
    Loader,
    SelectionStations,
    SelectionParams,
    SelectionYearsRange,
    SelectionYearSingle,
    SelectionStationMap
  },
  data() {
    return {
      selectedFork: null,
      stationOptions: [],
      forkOptions: [],
      sampleTypeOptions: [],
      selectedSampleType: null,
      selectedProject: null,
      loadedStations: [],
      selectedStationObject: null
    };
  },
  watch: {
    // selectedSampleType: function(){
    //   console.log("selectedSampleType", this.selectedSampleType)
    //   this.$store.commit("selection/SET_SAMPLE_TYPE", this.selectedSampleType);
    // },
    stations: function(){
      console.log("WATCH stations", this.stations)
      this.$store.dispatch("selection/SET_ALL_STATIONS", this.stations);
      this.stationOptions = calculateStationsForSelection(
        this.stations);
      // this.$store.commit("data/SET_")
    },
    selectedProject: function(){
      let types = this.calcSampleTypes(this.selectedProject)
      
      this.sampleTypeOptions = types
      this.selectedSampleType = (types && types.length > 0) ? types[0] : null

      //let params = this.calcParams(this.selectedProject)
      console.log("WATCH selectedProject", this.selectedProject, types)
    },
    selectedStation: function(newStation, oldStation){
      console.log("selectedStation changed", newStation, oldStation)
      //this.$store.commit("selection/RESET_PARAMS");
    }
  },
  computed: {
    ...mapState([
      'ui',
      'selection',
      'data',
      'organization'
    ]),
    selectedStation: {
      get: function() {
        console.log("COMPUTED GETTER selectedStation", this.data.selectedStation)
//        return calcStationOption(this.data.selectedStation)
        if(this.data.selectedStation && this.data.selectedStation.info && this.data.selectedStation.info.id)
          return calcStationOption(this.data.selectedStation.info)
        return this.data.selectedStation;
      },
      set: function(station) {
        if(station){
          console.log("COMPUTED SETTER selectedStation", station.value)
          this.selectedStationObject = station.value;
          this.$store.commit("data/SELECT_STATION", station.value.id)
        }
      }
    },
    sortedStationOptions: function() {
      return sortBy(this.stationOptions, o => o.label);
    },
    // selectedProject: function() {
    //   return this.data.activeProject;
    // }
  },
  mounted() {
    //console.log("Selection Mounted", "Projects", this.projects, "Stations", this.stations)
    // Sets allStations in selection vuex but also parses allForks, allWaterbodies etc
    this.$store.dispatch("selection/SET_ALL_STATIONS", this.stations);
    // Initialize forks, streams and stations
    //this.forkOptions = calculateForksForSelection(this.selection.allForks);
    this.stationOptions = calculateStationsForSelection(
      this.stations,);
    if(this.data.activeProject)
      this.selectedProject = this.data.activeProject;
  },
  methods: {
    // forkUpdated: function() {
    //   console.log("this.selectedFork", this.selectedFork);
    //   // selected allForks
    //   if (!this.selectedFork.value) {
    //     this.stationOptions = calculateStationsForSelection(
    //       this.stations,
    //       null
    //     );
    //   } else {
    //     // selected an actual Fork
    //     this.stationOptions = calculateStationsForSelection(
    //       this.stations,
    //       this.selectedFork
    //     );
    //   }
    //   this.selectedStation = null;
    // },
    calcParams: function(project){
      const params = {}
      if(project.Parameters){
        const ps = []
        project.Parameters.map(p => {
          if(p.Constituent && p.Constituent.MatrixCode && p.Constituent.AnalyteCode){
            const name = p.Name || [p.Constituent.MatrixCode.MatrixShort, p.Constituent.AnalyteCode.AnalyteShort, p.Constituent.UnitCode.Unit].join("_");
            const code = [p.Constituent.MatrixCode.MatrixShort, p.Constituent.AnalyteCode.AnalyteShort].join("_");
            if(!ps.includes(code)){
              params[code] = name;
              ps.push(code)
            }
          }
        })
      }
      return params;
    },
    calcSampleTypes: function(project){
      const types = []
      if(project.Parameters){
        const codes = []
        project.Parameters.map(p => {
          const code = p.SampleType.SampleTypeCode
          if(!codes.includes(code)){
            types.push({label: p.SampleType.Name + "s", value: code})
            codes.push(code)
          }
        })
      }
      return types;
    },
    fetchStationData: function(station) {
      //console.log("fetchStationData", station)
      if(station)
        this.$store.dispatch("data/FETCH_STATION_DATA", station.value);
      else {
        //this.$store.dispatch("data/REMOVE_STATION", station.id);
      }
    },
    sampleTypeUpdated: function() {
      console.log("sampleTypeUpdated", this.selectedSampleType)
      //this.$store.commit()
    },
    projectUpdated: function () {
      console.log("projectUpdated", this.selectedProject);
      this.$store.commit("data/SET_PROJECT", this.selectedProject)
      this.$store.commit("selection/SET_PROJECT", this.selectedProject)
      this.$store.commit("data/SELECT_STATION", null)
      this.$store.commit("data/RESET_STATIONS")
      this.$store.commit("selection/CLEAR_PARAM")
      //this.$store.commit("selection/RESET_PARAMS");

    }
  }
};
</script>

<style>
#selection-boxes > div {
  z-index: 2000;
}
.hide-multiselect {
  opacity: 0;
}
.ui.two.column.centered.grid {
  transition: all 0.3s ease;
}
</style>

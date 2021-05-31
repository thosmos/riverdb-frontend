<template>
  <div v-if="data.loadedStations.length > 0 && data.selectedStation"
       id="download"
       class="">
    <sui-grid>
      <sui-grid-row centered
                    stackable>
        <div class="m-t-md">
          <sui-button @click="selectedStation">Download
            {{data.selectedStation.info.StationName}}</sui-button>
        </div>
        <div class="m-t-md" v-if="enableAll">
          <div v-if="!loadingAllStations">
            <sui-button @click="allStations">Download all stations</sui-button>
          </div>
          <div v-else>
            <sui-button loading
                        content="Loading" />
          </div>
        </div>
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
import { mapState } from "vuex";
import fileDownload from "js-file-download";
import axios from "axios";

export default {
  name: "DownloadWrapper",
  props: {
    Stations: Array
  },
  data() {
    return {
      loadingAllStations: false
    };
  },
  computed: {
    ...mapState({
      data: state => state.data,
      selection: state => state.selection,
      ui: state => state.ui
    }),
    enableAll: function() {
      const sitevisit = this.data.activeProject && this.data.activeProject.ProjectType && this.data.activeProject.ProjectType.ident === "sitevisit"
      console.log("ENABLE DOWNLOAD ALL", this.data.activeProject)
      return sitevisit;
    }
  },
  methods: {
    selectedStation: function() {
      let csv = this.data.selectedStation
        .setYearRange({
          startYear: this.selection.selectionRange[0],
          endYear: this.selection.selectionRange[1]
        })
        .getCSV();
      fileDownload(csv, this.data.selectedStation.info.StationName);
    },
    allStations: function() {
      this.loadingAllStations = true;
      axios
        .get("https://admin.riverdb.org/sitevisits.csv")
        .then(res => {
          this.loadingAllStations = false;
          fileDownload(res.data, "complete stations.csv");
        })
        .catch(err => {
          this.loadingAllStations = false;
          console.log(err);
          // TODO: implement error msg
        });
    }
  }
};
</script>

<style>
</style>

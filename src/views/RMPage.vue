<template>
  <div id="RM">
    <sui-container fluid>
      <sui-header size="huge"
                  textAlign="center">River Monitoring Data:</sui-header>
      <sui-message v-if="ui.errorMsg.RM_Datafetch"
                   color="red">
        <p>{{ui.errorMsg.RM_Datafetch}}</p>
      </sui-message>
      <div v-if="$apollo.loading">
        <Loader/>
      </div>
      <div v-else>
        <sui-grid>
          <sui-grid-row>
            <sui-grid-column>
              <selection-wrapper :stations="stations">
              </selection-wrapper>
            </sui-grid-column>
          </sui-grid-row>
          <sui-grid-row>
            <sui-grid-column>
              <download-wrapper>
              </download-wrapper>
            </sui-grid-column>
          </sui-grid-row>
          <sui-grid-row>
            <sui-grid-column>
              <chart-wrapper></chart-wrapper>
            </sui-grid-column>
          </sui-grid-row>
          <sui-grid-row>
            <sui-grid-column>
              <data-table></data-table>
            </sui-grid-column>
          </sui-grid-row>
        </sui-grid>
      </div>
    </sui-container>
  </div>
</template>

<script>
import SelectionWrapper from "../components/SelectionWrapper";
import DownloadWrapper from "../components/DownloadWrapper";
import ChartWrapper from "../components/ChartWrapper";
import Loader from "../components/Loader";
import DataTable from "../components/DataTable";

import { GET_STATIONS, GET_STATION_DATA } from "../apollo/queries";
import { mapState } from "vuex";
import find from "lodash/find";

export default {
  name: "RMPage",
  components: {
    Loader,
    SelectionWrapper,
    ChartWrapper,
    DataTable,
    DownloadWrapper
  },
  computed: {
    ...mapState({
      ui: state => state.ui,
      data: state => state.data
    })
  },
  mounted() {
    let { stations } = this.$route.query;
    let { param } = this.$route.query;
    let { yearRange } = this.$route.query;
    if (stations) {
      // if ?stations=... fetch those
      stations.split(",").map(id => {
        //  could use this.$store.dispatch("data/FETCH_STATION_DATA", station) but tricky with if (yearRange....)       this.$store.commit("ui/IS_LOADING", true);
        this.$apollo
          .query({
            query: GET_STATION_DATA,
            variables: {
              station: id
            }
          })
          .then(res => {
            this.$store.commit("ui/CLEAR_ERROR_MSG", "selection");
            this.$store.commit("ui/IS_LOADING", false);
            if (find(this.data.loadedStations, o => id === o.info.StationID)) {
              this.$store.commit("ui/SET_ERROR_MSG", {
                section: "selection",
                msg: `Station is already selected`
              });
            } else {
              let station = find(
                this.stations,
                o => o.StationID === parseInt(id)
              );
              this.$store.dispatch("data/ADD_STATION_DATA", {
                info: station,
                data: res.data
              });
              // yearRange check needs to be after because ADD_STATION_DATA does it's own SET_YEAR_RANGE
              if (yearRange) {
                // yearRange query parser
                let years = yearRange.split(",");
                let startYear = parseInt(years[0]);
                let endYear = parseInt(years[1]);
                this.$store.commit("selection/SET_YEAR_RANGE", [
                  startYear,
                  endYear
                ]);
              }
            }
          })
          .catch(err => {
            console.log("err", err);
            this.$store.commit("ui/SET_ERROR_MSG", {
              section: "selection",
              msg: `Couldn't fetch station data`
            });
          });
      });
    }
    if (param) {
      // param query parser
      this.$store.commit("selection/SELECT_ACTIVE_PARAM", param);
    }
  },
  apollo: {
    stations: {
      query: GET_STATIONS, // Initial data fetch of all stations...
      // TODO: add organization variables once it becomes available from Thomas
      error(err) {
        console.log("err", err);
        this.$store.commit("ui/SET_ERROR_MSG", {
          section: "RM_Datafetch",
          msg: `Couldn't fetch intial stations`
        });
      }
    }
  }
};
</script>

<style>
</style>

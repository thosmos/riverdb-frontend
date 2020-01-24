<template>
  <div id="RM">
    <sui-container fluid>
      <div class="page-spacer">

        <sui-header class="rm-data-header" 
                    size="medium" 
                    textAlign="center">Water Quality Monitoring Data:</sui-header>
        <div v-if="showTakeTour"
             class="m-t-md m-b-md">
          <div class="ui grid centered">
            <sui-button-group>
              <sui-button @click="takeTour"
                          color="blue">Take the Tour</sui-button>
              <sui-button-or />
              <sui-button @click="removeTour"
                          color="red">Never show this again</sui-button>
            </sui-button-group>
          </div>
        </div>
        <sui-grid>
          <sui-grid-row>
            <sui-grid-column>
              <sui-message v-if="ui.errorMsg.RM_Datafetch"
                           color="red">
                <p>{{ui.errorMsg.RM_Datafetch}}</p>
              </sui-message>
            </sui-grid-column>
          </sui-grid-row>
        </sui-grid>
        <div v-if="$apollo.loading">
          <Loader />
        </div>
        <div v-else>
          <sui-grid>
            <sui-grid-row>
              <sui-grid-column>
                <selection-wrapper :stations="stations">
                </selection-wrapper>
              </sui-grid-column>
            </sui-grid-row>
          </sui-grid>
        </div>
        <sui-grid>
          <sui-grid-row>
            <sui-grid-column>
              <chart-wrapper id="step-8"></chart-wrapper>
            </sui-grid-column>
          </sui-grid-row>
        </sui-grid>
        <sui-grid>
          <sui-grid-row>
            <sui-grid-column>
              <download-wrapper id="step-7">
              </download-wrapper>
            </sui-grid-column>
          </sui-grid-row>
          <sui-grid-row class="m-b-lg">
            <sui-grid-column>
              <data-table></data-table>
            </sui-grid-column>
          </sui-grid-row>
        </sui-grid>
      </div>
    </sui-container>
    <v-tour name="myTour"
            :steps="steps"></v-tour>
    <station-info-modal v-if="ui.showInfoModalStation"></station-info-modal>
  </div>
</template>

<script>
import SelectionWrapper from "../components/SelectionWrapper";
import DownloadWrapper from "../components/DownloadWrapper";
import ChartWrapper from "../components/ChartWrapper";
import Loader from "../components/Loader";
import DataTable from "../components/DataTable";
import StationInfoModal from "../components/StationInfoModal";

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
    DownloadWrapper,
    StationInfoModal
  },
  computed: {
    ...mapState({
      ui: state => state.ui,
      data: state => state.data,
      organization: state => state.organization
    })
  },
  data() {
    return {
      showTakeTour: true,
      name: "my-tour",
      SYRCL: "SYRCL",
      steps: [
        {
          target: "#step-0",
          content: `Select a river fork to narrow the list of stations`,
          params: {
            placement: "top"
          }
        },
        {
          target: "#step-2",
          content: `Select a station to see data.`
        },
        {
          target: "#step-3",
          content: `The map shows you the location of stations. selected stations are in black`,
          params: {
            placement: "top"
          }
        },
        {
          target: "#step-4",
          content: `One of the stations is always highlighted in blue. It will matter in certain graphs (box plot per month) and will be the station for downloads and in the data table.`
        },
        {
          target: "#step-6",
          content: `In some graphs you can restrict the timeframe shown in the graph and in the data table.`
        },
        {
          target: "#step-5",
          content: `Choose your parameter for the graph. If you have one of the line graphs and only one station selected you can also visualize a second parameter on the same graph!`
        },
        {
          target: "#step-8",
          content: `There are different kind of graphs. The button in the right-upper corner lets you download an image of the graph.`,
          params: {
            placement: "top"
          }
        },
        {
          target: "#step-7",
          content: `Download the data for the selected station or all stations in .csv format!`
        },
        {
          target: "#step-9",
          content: `Finally, all data for the selected timeframe and the selected station will be displayed in this data table. By clicking on the top row you can sort by parameter as well.`,
          params: {
            placement: "bottom"
          }
        }
      ]
    };
  },
  methods: {
    removeTour: function() {
      localStorage.setItem("noTour", true);
      this.showTakeTour = false;
      this.$ga.event("Tour", "don't show");
    },
    takeTour: function() {
      this.$ga.event("Tour", "take");
      this.showTakeTour = false;
      // FIXME: will be messy with other organizations!
      this.$router.push({
        path: ``,
        query: {
          stations: "999SY19,999SY35",
          param: "H2O_pH",
          yearRange: "2014,2017"
        }
      });
      this.$tours["myTour"].start();
    },
    adjustToQuery: function() {
      let {
        stations,
        param,
        yearRange,
        chartType,
        selectedStation,
        secondaryParam
      } = this.$route.query;
      if (stations) {
        // if ?stations=... fetch those
        stations.split(",").map(id => {
          //  could use this.$store.dispatch("data/FETCH_STATION_DATA", station) but tricky with if (yearRange....)       this.$store.commit("ui/IS_LOADING", true);
          this.$apollo
            .query({
              query: GET_STATION_DATA,
              variables: {
                stationCode: id
              }
            })
            .then(res => {
              this.$store.commit("ui/CLEAR_ERROR_MSG", "selection");
              this.$store.commit("ui/IS_LOADING", false);
              if (
                find(this.data.loadedStations, o => id === o.info.StationID)
              ) {
                this.$store.commit("ui/SET_ERROR_MSG", {
                  section: "selection",
                  msg: `Station is already selected`
                });
              } else {
                let station = find(this.stations, o => o.StationCode === id);
                this.$store.dispatch("data/ADD_STATION_DATA", {
                  info: station,
                  data: res.data,
                  selectedStation
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
            .catch(() => {
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
      if (chartType) {
        this.$store.commit("selection/SET_CHART_TYPE", chartType);
      }
      if (selectedStation) {
        this.$store.commit("data/SELECT_STATION", selectedStation);
      }
      if (secondaryParam) {
        console.log("GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
        this.$store.commit("selection/SELECT_SECONDARY_PARAM", secondaryParam);
      }
    }
  },
  mounted() {
    // Check for tour
    if (localStorage.getItem("noTour")) {
      this.showTakeTour = false;
    }
    this.adjustToQuery();
  },
  apollo: {
    stations: {
      query: GET_STATIONS, // Initial data fetch of all stations...
      variables() {
        if (
          this.organization &&
          this.organization.activeOrganization &&
          this.organization.activeOrganization !== "all"
        ) {
          return { agency: this.organization.activeOrganization };
        }
        return {};
      },
      error() {
        this.$store.commit("ui/SET_ERROR_MSG", {
          section: "RM_Datafetch",
          msg: `Couldn't fetch intial stations`
        });
      }
    }
  }
};
</script>

<style lang="scss">
#RM {
  .page-spacer {
    /* NOTE: kind of forced way to do it but does the job, out of the box has way to much margin on mobile */
    @media only screen and (max-width: 1024px) {
      margin: 2rem -1.5rem 0 0;
    }
    @media only screen and (min-width: 1024px) {
      margin-left: 2rem;
    }
  }
  .rm-data-header {
    margin-bottom: 0;
  }
}
</style>

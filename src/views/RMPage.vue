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
            <chart-wrapper></chart-wrapper>
          </sui-grid-row>
        </sui-grid>
      </div>
    </sui-container>
  </div>
</template>

<script>
import SelectionWrapper from "../components/SelectionWrapper";
import ChartWrapper from "../components/ChartWrapper";
import Loader from "../components/Loader";

import { GET_STATIONS } from "../apollo/queries";
import { mapState } from "vuex";

export default {
  name: "RMPage",
  components: { Loader, SelectionWrapper, ChartWrapper },
  computed: {
    ...mapState({
      ui: state => state.ui
    })
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

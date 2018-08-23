<template>
  <div id="RM">
    <sui-container fluid>
      <sui-header size="huge"
                  textAlign="center">River Monitoring Data:</sui-header>
      <div v-if="$apollo.loading">
        <Loader/>
      </div>
      <div v-else>
        <sui-grid>
          <sui-grid-column>
            <selection-wrapper :stations="stations">
            </selection-wrapper>
          </sui-grid-column>
        </sui-grid>
      </div>
    </sui-container>
  </div>
</template>

<script>
import SelectionWrapper from "../components/SelectionWrapper";
import Loader from "../components/Loader";

import { GET_STATIONS } from "../apollo/queries";

export default {
  name: "RMPage",
  components: { Loader, SelectionWrapper },
  apollo: {
    stations: {
      query: GET_STATIONS, // Initial data fetch of all stations...
      // TODO: add organization variables once it becomes available from Thomas
      error(err) {
        console.log("ERROR");
        console.log("err", err);
      }
    }
  }
};
</script>

<style>
</style>

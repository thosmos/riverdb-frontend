<template>
  <div id="RM">
    <sui-container fluid>
      <sui-header size="huge"
                  textAlign="center">River Monitoring Data:</sui-header>
      <div v-if="$apollo.loading">
        <Loader/>
      </div>
      <r-m-selection-wrapper :stations="stations"></r-m-selection-wrapper>
    </sui-container>
  </div>
</template>

<script>
import RMSelectionWrapper from "../components/RMSelectionWrapper";
import Loader from "../components/Loader";

import { GET_STATIONS } from "../apollo/queries";

export default {
  name: "RMPage",
  components: { Loader, RMSelectionWrapper },
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

<template>
  <div>
    <div v-if="$apollo.loading">
      <Loader/>
    </div>
    <h1>RM Page</h1>
  </div>
</template>

<script>
import Loader from "../components/Loader";

import { GET_STATIONS } from "../apollo/queries";

export default {
  name: "RMPage",
  components: { Loader },
  apollo: {
    stations: {
      query: GET_STATIONS, // Initial data fetch of all stations...
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

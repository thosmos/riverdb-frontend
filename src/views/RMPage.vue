<template>
  <div>
    <h1>RM Page</h1>
  </div>
</template>

<script>
import { GET_STATIONS } from "../apollo/queries";

export default {
  name: "RMPage",
  apollo: {
    stations: {
      query: GET_STATIONS // Initial data fetch of all stations...
    }
  }
};
</script>

<style>
</style>

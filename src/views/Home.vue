<template>
  <div id="home">
    <sui-container>
      
      <!-- <sui-header size="large" textAlign="center">About RiverDB</sui-header> -->
      <p>
        RiverDB is a cloud database and website helping environmental organizations store, analyze, and share scientific data from watershed monitoring programs.
        In addition to providing public maps, charts, and tables of our member's data, RiverDB aims to optimize the experience of repetitive data entry, report generation, and data quality checking.
      </p>
      <sui-header id="org-header" size="medium" textAlign="center">Participating Organizations:</sui-header>
      <organizations-map />
      <organizations-list />
    </sui-container>
  </div>
</template>

<script>
import OrganizationsList from "../components/OrganizationList";
import OrganizationsMap from "../components/OrganizationsMap.vue";

export default {
  name: "home",
  components: {
    OrganizationsList,
    OrganizationsMap
  },
  data: function() {
    return {};
  },
  mounted() {}
};
</script>

<style>
#home {
  margin-bottom: 50px;
}
#org-header {
  margin-top: 0;
}
</style>

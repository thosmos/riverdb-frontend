<template>
  <div id="home">
    <sui-container>
      <sui-header size="huge"
                  textAlign="center">Participating Organizations:</sui-header>
      <organizations-list />
      <organizations-map />
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

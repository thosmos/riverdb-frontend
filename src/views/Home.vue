<template>
  <div class="home">
    <sui-container>
      <sui-header size="huge"
                  textAlign="center">Participating Organizations:</sui-header>
      <organizations-list/>
      <div v-if="docLoaded">
        <organizations-map />
      </div>
    </sui-container>
  </div>
</template>

<script>
import OrganizationsList from "../components/OrganizationList";

export default {
  name: "home",
  components: {
    OrganizationsList,
    OrganizationsMap: () => import("../components/OrganizationsMap.vue")
  },
  data: function() {
    return {
      docLoaded: false
    };
  },
  mounted() {
    window.addEventListener("load", () => {
      this.docLoaded = true;
    });
  }
};
</script>

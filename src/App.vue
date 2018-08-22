<template>
  <div id="app">
    <div id="">
      <nav-bar></nav-bar>
    </div>
    <page-layout>
      <router-view/>
    </page-layout>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import PageLayout from "./components/PageLayout";

export default {
  name: "App",
  components: {
    NavBar,
    PageLayout
  },
  metaInfo: {
    title: "Home",
    titleTemplate: "%s | RiverDB database",
    meta: [
      { charset: "utf-8" },
      {
        vmid: "description",
        name: "description",
        content:
          "RiverDB lets organizations save their data into a database compliant with CEDEN regulations and view the data in multiple ways, including charts & tables."
      }
    ]
  },

  watch: {
    $route: function() {
      this.$store.commit(
        "organization/SET_ACTIVE_ORGANIZATION",
        this.$route.params.org
      );
    }
  }
};
</script>


<style lang="scss">
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: #eee;
  background-image: url("./assets/background-tiles/waves-0.1.png");
  background-repeat: repeat;
}
</style>

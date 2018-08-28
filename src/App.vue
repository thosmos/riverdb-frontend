<template>
  <div id="app">
    <div id="">
      <nav-bar></nav-bar>
    </div>
    <page-layout>
      <router-view/>
    </page-layout>
    <cookie-msg v-if="ui.showCookieMsg"></cookie-msg>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import PageLayout from "./components/PageLayout";
import CookieMsg from "./components/CookieMsg";

import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    NavBar,
    PageLayout,
    CookieMsg
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
  mounted() {
    let cookiesOK = localStorage.getItem("cookiesOK");
    if (cookiesOK) {
      this.$store.commit("ui/CLEAR_COOKIE_MSG");
    }
  },
  computed: {
    ...mapState({
      ui: state => state.ui
    })
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

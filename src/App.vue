<template>
  <div id="app">
    <div id="aaaa">
      <nav-bar></nav-bar>
      <page-layout>
        <transition name="fade">
          <router-view />
        </transition>
      </page-layout>
    </div>
    <Footer></Footer>
    <cookie-msg v-if="ui.showCookieMsg"></cookie-msg>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import PageLayout from "./components/PageLayout";
import CookieMsg from "./components/CookieMsg";
import Footer from "./components/Footer";

import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    NavBar,
    PageLayout,
    CookieMsg,
    Footer
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
    this.$store.commit("data/PROVIDE_APOLLO", this.$apollo);
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


<style lang="scss" >
#aaaa {
  min-height: 100vh;
  margin-bottom: -50px;
}
#footer {
  height: 50px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<template>
  <div id="app">
    <div id="aaaa">
      <img v-if="$route.path === '/'" width="100%" src="img/Hwy49-YUBA-2.jpg" padding="0" margin="0"/>
      <nav-bar/>
      <page-layout>
        <transition name="fade">
          <router-view/>
        </transition>
      </page-layout>
    </div>
    <Footer/>
    <cookie-msg v-if="ui.showCookieMsg"></cookie-msg>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import PageLayout from "./components/PageLayout";
import CookieMsg from "./components/CookieMsg";
import Footer from "./components/Footer";
import router from "./router";

import { GET_AGENCIES } from "./apollo/queries";

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
          "RiverDB lets organizations save their data into a database compliant with CEDEN and view the data in multiple ways, including charts & tables."
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
    // $route: function() {
    //   if(this.$route.params.org){
    //     console.log("SET ACTIVE ORG", this.$route.params.org)
    //     this.$store.commit(
    //       "organization/SET_ACTIVE_ORGANIZATION",
    //       this.$route.params.org
    //     );
    //   }
    // },
    // agencies: function () {
    //   console.log ("GOT AGENCIES")
    //   this.$store.commit(
    //     "organization/SET_ORGS",
    //     this.agencies
    //   );
    // }
  },
  // apollo: {
  //   agencies: {
  //     query: GET_AGENCIES, 
  //     error() {
  //       this.$store.commit("ui/SET_ERROR_MSG", {
  //         section: "RM_Datafetch",
  //         msg: `Couldn't fetch initial orgs`
  //       });
  //     }
  //   }
  // }
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

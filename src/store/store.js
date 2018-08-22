import Vue from "vue";
import Vuex from "vuex";

import { organization } from "./index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    organization
  }
});

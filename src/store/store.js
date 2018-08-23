import Vue from "vue";
import Vuex from "vuex";

import { organization, selection, ui, data } from "./index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    organization,
    selection,
    ui,
    data
  }
});

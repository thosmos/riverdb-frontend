import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "./registerServiceWorker";

/**
 * Semantic and CSS
 */
import SuiVue from "semantic-ui-vue";
// TODO: semantic theming
import "./style/semantic/semantic.min.css";
import "./style/style.scss";
import "../node_modules/leaflet/dist/leaflet.css";
import "../node_modules/vue-multiselect/dist/vue-multiselect.min.css";

Vue.use(SuiVue);

import apolloProvider from "./apollo";

import highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import highchartsMore from "highcharts-more";
require("highcharts/modules/exporting")(highcharts);
require("highcharts/modules/heatmap")(highcharts);

highchartsMore(highcharts);
Vue.use(HighchartsVue, { highcharts });

import { ClientTable } from "vue-tables-2";
Vue.use(ClientTable, {}, false, "bootstrap4", "default");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  provide: apolloProvider.provide(),
  render: h => h(App)
}).$mount("#app");

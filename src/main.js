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

Vue.use(SuiVue);

import apolloProvider from "./apollo";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  provide: apolloProvider.provide(),
  render: h => h(App)
}).$mount("#app");

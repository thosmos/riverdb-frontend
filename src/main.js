import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import SuiVue from "semantic-ui-vue";
// TODO: semantic theming
import "../node_modules/semantic-ui/dist/semantic.css";

Vue.use(SuiVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

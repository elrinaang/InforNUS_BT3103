import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuefire from "vuefire";
import Chart from "chart.js";
import VueChartKick from "vue-chartkick";
import BootstrapVue from "bootstrap-vue";
import StarRating from "vue-star-rating";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSingleSelect from "vue-single-select";

Vue.component("vue-single-select", VueSingleSelect);
Vue.use(vuefire);
Vue.use(VueChartKick, { adapter: Chart });
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
});

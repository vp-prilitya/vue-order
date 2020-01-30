import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import { store } from './_store';

import  BootstrapVue  from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import vSelect from 'vue-select'

import 'vue-select/dist/vue-select.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.component('v-select', vSelect)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

require('./bootstrap');
window.csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token; // for all requests

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Store from "./store" 
import Router from "./routes.js"

Vue.use(VueRouter);

new Vue({
  store: Store, 
  router: Router,
  render: h => h(App)
}).$mount('#app'); 
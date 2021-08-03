import Vue from 'vue'
import App from './App.vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import VueRouter from 'vue-router'

import Country from "./components/Country.vue"

Vue.use(VueRouter)
const  router = new VueRouter({
    routes: [
        {
          path:"/",
          name:"app",
          component:Country
        },
        {
          path:"/:countrySlug",
          name:"country",
          component:Country
        }
    ],
    mode:"history"
});
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')

import Vue from "vue"
import VueRouter from 'vue-router'
import Country from "./components/Country.vue"

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "app",
      component: Country
    },
    {
      path: "/:countrySlug",
      name: "country",
      component: Country
    }
  ],
  mode: "history"
});
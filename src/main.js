import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex"
import VueI18n from "vue-i18n"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import VueRouter from 'vue-router'

import Country from "./components/Country.vue"

Vue.use(Vuex);
Vue.use(VueI18n);

import axios from "axios"

const store = new Vuex.Store({
  state: {
    countries: [],
    totalGlobal: {},
    dailyRecords: []
  },
  mutations: {
    SET_COUNTRIES(state, countries) {
      state.countries = countries;
    },
    SET_GLOBAL_TOTAL(state, global) {
      state.totalGlobal = global;
    },
    INSERT_DAILY_RECORD_OF_COUNTRY(state, record) {
      state.dailyRecords.push(record);
    }
  },
  actions: {
    async setSummary({ commit }) {
      try {
        const response = await axios.get("https://api.covid19api.com/summary");
        commit("SET_COUNTRIES", response.data.Countries);
        commit("SET_GLOBAL_TOTAL", response.data.Global);
      }
      catch (errorMessage) {
        console.error(errorMessage);
      }
    },
    async setDailyRecords({ commit }, slug) {
        try {
          let apiURL = `https://api.covid19api.com/dayone/country/${slug}`;
          const response = await axios.get(apiURL);
          const record = response.data;

          let countryRecord = { slug: slug, record: record }

          commit("INSERT_DAILY_RECORD_OF_COUNTRY", countryRecord);
        } catch (errorMsg) {
          console.error(errorMsg)
        }
    }
  },
  getters: {
    countries(state) {
      return state.countries;
    },
    totalGlobal(state) {
      return state.totalGlobal;
    },
    dailyRecords(state) {
      return state.dailyRecords;
    },
  }
});

Vue.use(VueRouter)
const router = new VueRouter({
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

const contents={
  en:{
    totalCase : "Total Cases",
    totalDeath : "Total Deaths",
    activeCases : "Active Cases",
    recoveredCases:"Recovered Cases"
  },
  tr:{
    totalCase : "Toplam Vaka Sayısı",
    totalDeath : "Toplam Ölüm Sayısı",
    activeCases : "Aktif Vaka Sayısı",
    recoveredCases:"İyileşen Sayısı"
  }
}
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

const i18n = new VueI18n({
  locale: 'en', // set locale
  contents, // set locale messages
})

new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')

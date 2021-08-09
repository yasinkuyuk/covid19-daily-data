import Vue from "vue";
import Vuex from "vuex"
import axios from "axios";

Vue.use(Vuex)

export const store = new Vuex.Store({
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
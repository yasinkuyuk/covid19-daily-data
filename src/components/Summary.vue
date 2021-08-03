<template>
  <div class="mt-3">
    <b-card-group deck>
      <b-card border-variant="warning" header="Total Case" align="center">
        <b-card-text>{{ numberWithCommas(cases) }}</b-card-text>
      </b-card>
      <b-card border-variant="warning" header="Total Death" align="center">
        <b-card-text>{{ numberWithCommas(death) }}</b-card-text>
      </b-card>
      <b-card
        border-variant="danger"
        header="Active Cases"
        header-bg-variant="transparent"
        align="center"
      >
        <b-card-text>{{ numberWithCommas(activeCase) }}</b-card-text>
      </b-card>

      <b-card
        border-variant="danger"
        header="Recovered Cases"
        header-border-variant="info"
        header-text-variant="info"
        align="center"
      >
        <b-card-text>{{ numberWithCommas(recovered) }}</b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { eventBus } from "../event";
import axios from "axios";

export default {
  name: "Summary",
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async setSummary() {
      try {
        const response = await axios.get("https://api.covid19api.com/summary");
        let index = response.data.Countries.findIndex(
          (country) => country.Slug == this.$route.params.countrySlug
        );
        this.cases = response.data.Countries[index].TotalConfirmed;
        this.death = response.data.Countries[index].TotalDeaths;
        this.recovered = response.data.Countries[index].TotalRecovered;
      } catch (errorMessage) {
        console.error(errorMessage);
      }
    },
    async setGlobalSummary(){
        const response = await axios.get("https://api.covid19api.com/summary");
        this.cases = response.data.Global.TotalConfirmed;
        this.death = response.data.Global.TotalDeaths;
        this.recovered = response.data.Global.TotalRecovered;
    },
  },
  data() {
    return {
      cases: 0,
      recovered: 0,
      death: 0,
    };
  },
  computed: {
    activeCase() {
      return this.cases - this.recovered;
    },
  },
  async mounted() { 
    eventBus.$on("setSummaryDatas", this.setSummary);
    if(this.$route.params.countrySlug == null){
        await this.setGlobalSummary();
        
    }
    if(this.cases == 0){
        await this.setSummary();
    }
  },
  beforeDestroy() {
    eventBus.$off("setSummaryDatas", this.setSummary);
  },
};
</script>

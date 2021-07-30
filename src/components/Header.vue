<template>
  <div>
    <button v-if="selectedCountry!=''" @click="getTotalData">Show Global Data</button>
    <select v-model="selectedCountry" name="country">
      <option v-for="country in countries" :key="country.Slug" :value="country.Slug" >{{country.Country}}</option>
    </select>
    <div class="mt-3">
      <b-card-group deck>
        <b-card border-variant="warning" header="Total Case" align="center">
          <b-card-text >{{ numberWithCommas(totalCase) }}</b-card-text>
        </b-card>
        <b-card border-variant="warning" header="Total Death" align="center">
          <b-card-text >{{ numberWithCommas(totalDeath) }}</b-card-text>
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
          <b-card-text>{{ numberWithCommas(recoveredCase) }}</b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {eventBus} from "../event"

export default {
  name: "Header",
  computed:{
    activeCase(){
      return this.totalCase - this.recoveredCase;
    }
  },
  data() {
    return {
      countries: [],
      selectedCountry:null,
      totalCase:0,
      recoveredCase:0,
      totalDeath: 0
    };
  },
  methods: {
    async getCountry() {
      try {
        const response = await axios.get(
          "https://api.covid19api.com/summary"
        );
        this.countries = response.data.Countries;
      } catch (errorMessage) {
        console.error(errorMessage);
      }
    },
    async getTotalData(){
      try {
        const response = await axios.get(
          "https://api.covid19api.com/summary"
        );
        this.totalCase = response.data.Global.TotalConfirmed;
        this.recoveredCase = response.data.Global.TotalRecovered;
        this.totalDeath = response.data.Global.TotalDeaths;
        this.selectedCountry = "";
      } catch (error) {
        console.error(error);
      }
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    updateTotalAndRecoveredCase(countrySlug){
      try{
        console.log(this.countries)
        let index = this.countries.findIndex((country)=>country.Slug == countrySlug);
        let country = this.countries[index];
        this.totalCase = country.TotalConfirmed;
        this.recoveredCase = country.TotalRecovered;
        this.totalDeath = country.TotalDeaths;
        this.updateTable(countrySlug);
      }catch(error){
        console.log(error);
      }
        
    },
    updateTable(countrySlug){
      eventBus.$emit("updateTable",countrySlug);
    }
  },
  async mounted() {
    await this.getCountry();
    await this.getTotalData();
  },
  watch:{
    selectedCountry:{
      deep:true,
      handler(){
        console.log("sa")
        this.updateTotalAndRecoveredCase(this.selectedCountry);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

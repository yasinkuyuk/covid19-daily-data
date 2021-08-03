<template>
  <div>
    <select v-model="selectedCountry" @change="onChange" >
      <option
        v-for="country in countries"
        :key="country.Slug"
        :value="country.Slug"
      >
        {{ country.Country }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../event";

export default {
  name: "Header",
  data() {
    return {
      countries: [],
      selectedCountry: null,
    };
  },
  methods: {
    async getCountry() {
      try {
        const response = await axios.get("https://api.covid19api.com/summary");
        this.countries = response.data.Countries;
        console.log("countries:",this.countries); 
      } catch (errorMessage) {
        console.error(errorMessage);
      }
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    onChange(event){
      this.$router.push({
        name: "country",
        params:{
          countrySlug: event.target.value
        }
      });
      eventBus.$emit("setSummaryDatas");
      eventBus.$emit("updateTable");
    },
  },
  async mounted() {
    await this.getCountry();
    this.$set(this,"selectedCountry",this.$route.params.countrySlug);
  },
};
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

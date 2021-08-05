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
import { mapGetters } from 'vuex';
import { eventBus } from "../event";

export default {
  name: "Header",
  data() {
    return {
      selectedCountry: null,
    };
  },
  methods: {
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
  computed:{
    ...mapGetters([
      "countries"
    ])
  },
  mounted() {
    this.$set(this,"selectedCountry",this.$route.params.countrySlug);
  },
};
</script>

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

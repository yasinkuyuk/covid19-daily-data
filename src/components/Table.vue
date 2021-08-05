<template>
  <b-container>
    <table class="table table-hover">
      <thead>
        <tr>
          <td>Day Count</td>
          <td>New Case</td>
          <td>New Death</td>
          <!-- <td>Total Case</td>
                    <td>Total Death</td> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dailyRecord, idx) in countryRecord" :key="idx">
          <td>{{ idx + 1 }}</td>
          <template v-if="idx > 0">
            <td>
              {{
                numberWithCommas(
                  dailyRecord.Confirmed - countryRecord[idx - 1].Confirmed
                )
              }}
            </td>
            <td>
              {{
                numberWithCommas(
                  dailyRecord.Deaths - countryRecord[idx - 1].Deaths
                )
              }}
            </td>
          </template>
          <template v-else>
            <td>{{ numberWithCommas(dailyRecord.Confirmed) }}</td>
            <td>{{ numberWithCommas(dailyRecord.Deaths) }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>

import {mapGetters} from "vuex"

export default {
  name: "Table",
  computed:{
    ...mapGetters(["dailyRecords"]),
    countryRecord(){
      const temp= this.dailyRecords.find(element => element.slug === this.$route.params.countrySlug);
      if(temp){
        return temp.record;
      }
      return [{Confirmed:0,Deaths:0}]
    }
  },
  methods: {

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  mounted() {
    if (this.$route.params.countrySlug && this.dailyRecords.findIndex(element => element.slug === this.$route.params.countrySlug) === -1){
      this.$store.dispatch("setDailyRecords",this.$route.params.countrySlug);
    }
  },
};
</script>

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
        <tr v-for="(caseRecord, idx) in caseRecordDayByDay" :key="idx">
          <td>{{ idx + 1 }}</td>
          <template v-if="idx > 0">
            <td>
              {{
                numberWithCommas(
                  caseRecord.Confirmed - caseRecordDayByDay[idx - 1].Confirmed
                )
              }}
            </td>
            <td>
              {{
                numberWithCommas(
                  caseRecord.Deaths - caseRecordDayByDay[idx - 1].Deaths
                )
              }}
            </td>
          </template>
          <template v-else>
            <td>{{ numberWithCommas(caseRecord.Confirmed) }}</td>
            <td>{{ numberWithCommas(caseRecord.Deaths) }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
import { eventBus } from "../event";
import axios from "axios";

export default {
  name: "Table",
  data() {
    return {
      caseRecordDayByDay: [],
    };
  },
  methods: {
    async setData() {
      let countrySlug = this.$route.params.countrySlug;
      console.log("mounted:", this.$route.params.countrySlug);

      let apiURL = `https://api.covid19api.com/dayone/country/${countrySlug}`;
      const response = await axios.get(apiURL);
      this.caseRecordDayByDay = response.data;
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  async mounted() {
    eventBus.$on("updateTable", this.setData);
    if(this.caseRecordDayByDay.length === 0 && this.$route.params.countrySlug != null){
      console.log("if iiçi");
      await this.setData();
    }
  },
  beforeDestroy() {
    eventBus.$off("updateTable", this.setData);
  },
};
</script>

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
          <td>{{ idx+1 }}</td>
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
    async setData(countrySlug) {
      let apiURL = `https://api.covid19api.com/dayone/country/${countrySlug}`;
      const response = await axios.get(apiURL);
      this.caseRecordDayByDay = response.data;
      //   let index = -1;
      //   response.data.forEach((element) => {
      //     if (index === -1) {
      //       this.caseRecordDayByDay.push(
      //         this.makeDailyDataPair(1, element.Confirmed, element.Deaths)
      //       );
      //       index++;
      //     } else {
      //       this.caseRecordDayByDay.push(
      //         this.makeDailyDataPair(
      //           index + 2,
      //           element.Confirmed -
      //             response.data[index].Confirmed -
      //             element.Recove,
      //           element.Deaths - response.data[index].Deaths
      //         )
      //       );
      //       index++;
      //     }
      //   });
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  mounted() {
    eventBus.$on("updateTable", this.setData);
  },
  beforeDestroy() {
    eventBus.$off("updateTable", this.setData);
  },
};
</script>

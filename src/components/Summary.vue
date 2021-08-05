<template>
  <div class="mt-3">
    <b-card-group deck>
      <b-card border-variant="warning" header="Total Case" align="center">
        <b-card-text>{{
          numberWithCommas(countrySummary.TotalConfirmed)
        }}</b-card-text>
      </b-card>
      <b-card border-variant="warning" header="Total Death" align="center">
        <b-card-text>{{
          numberWithCommas(countrySummary.TotalDeaths)
        }}</b-card-text>
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
        <b-card-text>{{
          numberWithCommas(countrySummary.TotalRecovered)
        }}</b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Summary",
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  computed: {
    ...mapGetters(["countries", "totalGlobal"]),

    activeCase() {
      return (
        this.countrySummary.TotalConfirmed - this.countrySummary.TotalRecovered
      );
    },
    countrySummary() {
      if (this.$route.params.countrySlug != null) {
        let country = this.countries.find(
          (element) => element.Slug === this.$route.params.countrySlug
        );
        if (country) {
          return country;
        }
        return {
            TotalConfirmed:0,
            TotalDeaths:0,
            TotalRecovered:0
        };
      } else {
        if (this.totalGlobal.TotalConfirmed != undefined) {
          return this.totalGlobal;
        }
        return {
            TotalConfirmed:0,
            TotalDeaths:0,
            TotalRecovered:0
        };
      }
    },
  },
};
</script>

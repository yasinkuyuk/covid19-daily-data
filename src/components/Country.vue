<template>
  <div id="app">
    <Summary />
    <Table />
  </div>
</template>

<script>
import Table from "./Table.vue";
import Summary from "./Summary.vue";

export default {
  name: "Country",
  components: {
    Summary,
    Table,
  },
  data() {
    return {
      isEditing:false
    };
  },
  methods:{
    preventNav(event) {
      if (!this.isEditing) return
      event.preventDefault()
      event.returnValue = ""
    },
  },
  beforeMount() {
    window.addEventListener("beforeunload", event => {
      if (!this.isEditing) return
      event.preventDefault()
      // Chrome requires returnValue to be set.
      event.returnValue = ""
    })
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

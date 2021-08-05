<template>
  <div id="app">
    <!-- <test></test> -->
    <router-link to="/">Global </router-link>
    <Selector />
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import Selector from "./components/Selector.vue";
// import Test from "./components/Test.vue"

export default {
  name: "App",
  components: {
    Selector,
    // Test
  },
  mounted() {
    this.$store.dispatch("setSummary");
  },
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

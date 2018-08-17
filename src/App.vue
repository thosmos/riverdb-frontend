<template>
  <div id="app">
    <div id="">
      <nav-bar></nav-bar>
    </div>
    <page-layout>
      <router-view/>
    </page-layout>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import PageLayout from "./components/PageLayout";

export default {
  name: "App",
  components: {
    NavBar,
    PageLayout
  }
};
</script>


<style lang="scss">
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: #eee;
  background-image: url("./assets/background-tiles/waves-0.1.png");
  background-repeat: repeat;
}
</style>

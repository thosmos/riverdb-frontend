<template>
  <div>
    <h4>{{ river }}</h4>
    <sui-button fluid color="blue" @click="navigate(route)">View Data</sui-button>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "Popup",
  props: ["route", "river"],
  methods: {
    navigate: function(route) {
      router.push(route);
    }
  }
};
</script>

<style scoped>
h4 {
  font-size: 1rem;
  text-align: center;
}
</style>

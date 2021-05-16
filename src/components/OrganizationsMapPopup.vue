<template>
  <div>
    <h4>{{ org }}</h4>
    <sui-button fluid color="blue" @click="navigate(`/org/${route}`)">View Organization</sui-button>
    <div class="space"> </div>
    <sui-button fluid color="blue" @click="navigate(`/data/${route}`)">View Data</sui-button>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "Popup",
  props: ["route", "org"],
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
.space {
  height: 10px;
}
</style>

<template>
  <div>
    <h4>{{ river }}</h4>
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: ["text", "river"]
};
</script>

<style scoped>
h4 {
  font-size: 1rem;
  text-align: center;
}
</style>

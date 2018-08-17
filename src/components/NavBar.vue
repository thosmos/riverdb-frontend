<template>
  <div id="nav">
    <h1>RiverDB</h1>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped lang="scss">
@import "../style/style.scss";

#nav {
  height: 48px;
  background: $primaryColor;
  color: $offWhite;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

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
  height: 60px;
  // background: $primaryColor;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(0, 132, 203, 1) 0%,
    $lightPrimaryColor 100%
  );
  border-bottom: 3px solid $secondaryColor;
  color: $offWhite;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

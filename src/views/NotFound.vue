<template>
  <div id="not-found">
    <div>
      <h1>404</h1>
      <h3>We couldn't find anyting under this URL</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style lang="scss" scoped>
#not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  h1,
  h3 {
    text-align: center;
  }
}
</style>

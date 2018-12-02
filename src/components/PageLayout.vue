<template>
  <div id="page"
       class="m-t-lg">
    <slot />
  </div>
</template>

<script>
export default {
  name: "PageLayout"
};
</script>

<style scoped style="scss">
#page {
  margin-bottom: 100px;
}
</style>

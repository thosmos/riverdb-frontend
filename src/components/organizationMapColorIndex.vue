<template>
  <div id="org-map-color-index">
    <div v-for="org in organizations" :key="org.river">
      <span
        class="info-box"
        :style="{background : `${org.options.fillColor}`, opacity: `${org.options.fillOpacity * 2}`}"
      >{{org.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrganizationMapColorIndex",
  props: {
    organizations: Array
  }
};
</script>

<style scoped lang="scss">
#org-map-color-index {
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  & > div {
    display: inline-block;
    color: rgba(0, 0, 0, 0.87);
    margin: 0 1rem;
    > span {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
    }
  }
}
</style>

<template>
  <div id="flow-button"
       class="ui center aligned grid">
    <div class="row">

      <div class="column">
        <sui-button basic
                    primary
                    centered>

          <router-link :to="flowRoute()">View the river flows in the area</router-link>
        </sui-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrgPageFlowButton",
  mounted() {},
  methods: {
    flowRoute: function() {
      return `/${this.$route.params.org}/Flows`;
    }
  }
};
</script>

<style scoped lang="scss">
#flow-button {
  margin: 1rem 0;
}
</style>

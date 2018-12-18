<template>
  <div id="flow-button">
    <!-- <div class="row">

      <div class="column"> -->
    <sui-button basic
                primary
                circular
                centered>

      <router-link :to="flowRoute()">View the river flows in the area</router-link>
    </sui-button>
    <!-- </div>
    </div> -->
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
@import "../style/style.scss";
#flow-button {
  padding: 0.75rem 0;
  background: $offWhite;
  border-top: 1px solid rgba(34, 36, 38, 0.15);
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  margin-bottom: 1rem;
  > button.ui.basic.circular.primary.button {
    margin: 1rem auto;
    display: block;
  }
  button:hover {
    @extend %button-darken-hover;
  }
}
</style>

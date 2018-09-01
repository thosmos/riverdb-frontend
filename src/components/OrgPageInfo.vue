<template>
  <div id="organization-info"
       class="m-t-md ui segment">
    <sui-menu :widths="3">
      <a is="sui-menu-item"
         v-for="item in items"
         :key="item"
         :active="isActive(item)"
         :content="item"
         @click="select(item)" />
    </sui-menu>
    <transition name="fade">
      <component v-bind:is="activeComponent"></component>
    </transition>
  </div>
</template>

<script>
import OrgPageDates from "./OrgPageDates";
import OrgPageBlogExcerpt from "./OrgPageBlogExcerpt";
import OrgPageOverviewMap from "./OrgPageOverviewMap";

export default {
  name: "OrgPageInfo",
  components: { OrgPageDates, OrgPageBlogExcerpt, OrgPageOverviewMap },
  data() {
    return {
      items: ["Blog", "Calendar", "Watershed"],
      activeComponent: "OrgPageBlogExcerpt"
    };
  },
  methods: {
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      if (name === "Blog") {
        this.activeComponent = "OrgPageBlogExcerpt";
      }
      if (name === "Calendar") {
        this.activeComponent = "OrgPageDates";
      }
      if (name === "Watershed") {
        this.activeComponent = "OrgPageOverviewMap";
      }
    }
  }
};
</script>

<style lang="scss" scoped >
@import "../style/style.scss";
#organization-page
  > div
  > div.m-t-md.ui.segment
  > div.ui.three.item.menu
  > a.active.item {
  background: $primaryColor;
  color: $offWhite;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

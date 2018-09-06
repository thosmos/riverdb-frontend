<template>
  <div id="organization-info"
       class="m-t-md ui segment">
    <!-- <sui-menu :widths="3">
      <a is="sui-menu-item"
         v-for="item in items"
         :key="item"
         :active="isActive(item)"
         :content="item"
         @click="select(item)" />
    </sui-menu>
    <transition name="fade">
      <component v-bind:is="activeComponent"></component>
    </transition> -->
    <watershed></watershed>
  </div>
</template>

<script>
import Calendar from "./OrgPageDates";
import Blog from "./OrgPageBlogExcerpt";
import Watershed from "./OrgPageOverviewMap";

export default {
  name: "OrgPageInfo",
  components: { Calendar, Blog, Watershed },
  data() {
    return {
      items: ["Blog", "Calendar", "Watershed"],
      activeComponent: "Blog"
    };
  },
  methods: {
    isActive(name) {
      return this.activeComponent === name;
    },
    select(name) {
      if (name === "Blog") {
        this.activeComponent = "Blog";
      }
      if (name === "Calendar") {
        this.activeComponent = "Calendar";
      }
      if (name === "Watershed") {
        this.$ga.event("View", "Watershed", this.$route.params.org);
        this.activeComponent = "Watershed";
      }
    }
  }
};
</script>

<style lang="scss"  >
@import "../style/style.scss";
#organization-info > div.ui.three.item.menu > a.active.item {
  background: $primaryColor;
  color: $offWhite;
  font-weight: bold;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

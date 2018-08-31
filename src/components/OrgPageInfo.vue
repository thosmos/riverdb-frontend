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
    <div v-if="active==='Calendar'
       ">
      <org-page-dates></org-page-dates>
    </div>
    <div v-if="active==='Blog'
       ">
      <org-page-blog-excerpt></org-page-blog-excerpt>
    </div>
    <div v-if="active==='Watershed'
       ">
      <org-page-overview-map></org-page-overview-map>
    </div>
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
      active: "Blog"
    };
  },
  methods: {
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      this.active = name;
    }
  }
};
</script>

<style lang="scss" >
@import "../style/style.scss";
#organization-page
  > div
  > div.m-t-md.ui.segment
  > div.ui.three.item.menu
  > a.active.item {
  background: $primaryColor;
  color: $offWhite;
}
</style>

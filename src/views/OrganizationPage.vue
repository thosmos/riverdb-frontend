<template>
  <div id="organization-page"
       v-if="info">
    <sui-container>
      <org-page-intro :info="info"></org-page-intro>
      <org-page-projects-list :info="info"></org-page-projects-list>
      <org-page-footer :info="info"></org-page-footer>
    </sui-container>
  </div>
</template>

<script>
import OrgPageIntro from "../components/OrgPageIntro";
import OrgPageFooter from "../components/OrgPageContact";
import OrgPageProjectsList from "../components/OrgPageProjectsList";

import organizations from "../assets/organizations.js";
import find from "lodash/find";

export default {
  name: "OrganizationPage",
  components: { OrgPageIntro, OrgPageFooter, OrgPageProjectsList },
  data() {
    return {
      info: null
    };
  },
  mounted() {
    this.info = find(
      organizations,
      o => o.abbreviation === this.$route.params.org
    );
  }
};
</script>

<style lang="scss">
</style>

<template>
  <div id="organization-page"
       v-if="info">
    <sui-container>
      <sui-card class="fluid">
        <org-page-intro :info="info"></org-page-intro>
        <org-page-flow-button></org-page-flow-button>
        <org-page-projects-list :info="info"></org-page-projects-list>
        <org-page-info></org-page-info>
        <org-page-footer :info="info"></org-page-footer>
      </sui-card>
    </sui-container>
  </div>
</template>

<script>
import OrgPageIntro from "../components/OrgPageIntro";
import OrgPageFooter from "../components/OrgPageContact";
import OrgPageProjectsList from "../components/OrgPageProjectsList";
import OrgPageOverviewMap from "../components/OrgPageOverviewMap";
import OrgPageInfo from "../components/OrgPageInfo";
import OrgPageFlowButton from "../components/OrgPageFlowButton";

import organizations from "../assets/organizations.js";
import find from "lodash/find";

export default {
  name: "OrganizationPage",
  components: {
    OrgPageIntro,
    OrgPageFooter,
    OrgPageProjectsList,
    OrgPageOverviewMap,
    OrgPageInfo,
    OrgPageFlowButton
  },
  data() {
    return {
      info: null
    };
  },
  mounted() {
    // TODO: replace with some backend data source
    this.info = find(
      organizations,
      o => o.abbreviation === this.$route.params.org
    );
    // NOTE: in case of invalid organzition redirect to 404, i.e. riverdb.org/SYRCLa
    if (!this.info) {
      this.$router.push("/404");
    }
  }
};
</script>

<style lang="scss">
#organization-page {
  margin-bottom: 75px;
}
</style>

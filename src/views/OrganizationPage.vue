<template>
  <div id="organization-page"
       v-if="info">
    <sui-container>
      <org-page-intro :info="info"></org-page-intro>
      <org-page-overview-map></org-page-overview-map>
      <org-page-projects-list :info="info"></org-page-projects-list>
      <org-page-footer :info="info"></org-page-footer>
    </sui-container>
  </div>
</template>

<script>
import OrgPageIntro from "../components/OrgPageIntro";
import OrgPageFooter from "../components/OrgPageContact";
import OrgPageProjectsList from "../components/OrgPageProjectsList";
import OrgPageOverviewMap from '../components/OrgPageOverviewMap';

import organizations from "../assets/organizations.js";
import find from "lodash/find";

import { mapActions} from 'vuex'

export default {
  name: "OrganizationPage",
  components: { OrgPageIntro, OrgPageFooter, OrgPageProjectsList, OrgPageOverviewMap },
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
  }
};
</script>

<style lang="scss">
</style>

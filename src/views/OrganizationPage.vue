<template>
  <div id="organization-page"
       v-if="info">
    <sui-container>
      
      <sui-card class="fluid">
        <org-page-intro :info="info"></org-page-intro>
        <!-- <org-page-flow-button></org-page-flow-button> -->
        <org-page-projects-list :info="info"></org-page-projects-list>
        <!-- <org-page-info></org-page-info> -->
        <org-page-footer :info="info"></org-page-footer>
      </sui-card>
    </sui-container>
  </div>
</template>

<script>
import OrgPageIntro from "../components/OrgPageIntro";
import OrgPageFooter from "../components/OrgPageContact";
import OrgPageProjectsList from "../components/OrgPageProjectsList";
import { mapState } from "vuex";
import {GET_PROJECTS} from "../apollo/queries";
// import OrgPageOverviewMap from "../components/OrgPageOverviewMap";
// import OrgPageInfo from "../components/OrgPageInfo";
// import OrgPageFlowButton from "../components/OrgPageFlowButton";

//import organizations from "../assets/organizations.js";
import find from "lodash/find";

export default {
  name: "OrganizationPage",
  components: {
    OrgPageIntro,
    OrgPageFooter,
    OrgPageProjectsList
    // OrgPageOverviewMap,
    // OrgPageInfo,
    // OrgPageFlowButton
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      ui: state => state.ui,
      data: state => state.data,
      organization: state => state.organization
    }),
    info: function() {
      if(this.organization && this.organization.orgs && this.$route.params.org){
        const orgs = this.organization.orgs
        const org = {...orgs[this.$route.params.org]}
        if(org){
          org.Projects = this.projects
          return org;
        }
      }
    }
  },
  mounted() {
    console.log("MOUNTED OrgPage", this.$route.params)
    // TODO: replace with some backend data source
    // if(this.organizations){
    //   this.info = find(
    //     organizations,
    //     o => o.abbreviation === this.$route.params.org
    //   );
    //   // NOTE: in case of invalid organzition redirect to 404, i.e. riverdb.org/SYRCLa
    //   if (!this.info) {
    //     this.$router.push("/404");
    //   }
    // }
  },
  watch: {
    // organization: function() {
    //   console.log("OrgPage ORGS", this.organization.orgs)
    // },
    projects: function() {
      console.log ("GOT PROJECTS")
      this.$store.commit(
        "organization/SET_PROJECTS",
        this.projects
      );
    }
  },
  apollo: {
    projects: {
      query: GET_PROJECTS, // Initial data fetch of all stations...
      variables() {
        if (
          this.organization &&
          this.organization.activeOrganization &&
          this.organization.activeOrganization !== "all"
        ) {
          return { agency: this.organization.activeOrganization };
        }
        return {};
      },
      error() {
        this.$store.commit("ui/SET_ERROR_MSG", {
          section: "RM_Datafetch",
          msg: `Couldn't fetch intial stations`
        });
      }
    }
  }
};
</script>

<style lang="scss">
#organization-page {
  margin-bottom: 75px;
}
</style>

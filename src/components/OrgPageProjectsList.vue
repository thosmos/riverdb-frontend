<template>
  <div id="org-page-projects-list">
    <h3 is="sui-header" class="ui center aligned">Projects:</h3>
    <div class="ui centered grid stackable">
      <div v-for="project in info.Projects" :key="project.ProjectID" class="eight wide computer column">
        <org-page-project-info :project="project" :AgencyCode="organization.activeOrganization.AgencyCode" />
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import loremIpsum from "lorem-ipsum";
import { mapState } from "vuex";
import OrgPageProjectInfo from './OrgPageProjectInfo.vue';

export default {
  components: { OrgPageProjectInfo },
  props: {
    info: Object
  },
  filters: {
    hasData: function(value) {
      console.log("hasData", value)
      if (value) {
        return "Project has data in database.";
      } else {
        return "There is no public data for this project at this point.";
      }
    },
    hasParams: function(project) {
      project.Parameters && (project.Parameters.length > 0)
    },
    paramCount: function(project) {
      console.log("paramCount", project.Parameters.length)
    },
    measureCount: function(params) {
      let c = 0
      if(params && params.length > 0)
        params.forEach(p => {
          if(p.SampleType.SampleTypeCode === "FieldMeasure") c++
        })
      return c;
    }
  },
  computed: {
    ...mapState({
      organization: state => state.organization
    }),
    description() {
      return loremIpsum({
        count: 5,
        unit: "sentences"
      });
    },    
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";

#org-page-projects-list {
  > h3 {
    margin: 1rem 1rem 1.75rem;
  }
  div > h5,
  p,
  small {
    color: black;
  }
}
#organization-page {
  .project-title {
    background: $primaryColor;
    h5 {
      color: $offWhite;
      text-align: center;
    }
  }
  .project-segment {
    position: relative;
    background: $offWhite;
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
    div {
      transition: all 0.3s ease-in-out;
    }
    h5 {
      text-decoration: underline;
    }
    .inner {
      transition: opacity 0.5s ease;
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      background: rgba(0, 0, 0, 0.6);
      padding: 1rem;
      border-radius: 0.5rem;
    }
    // &:hover {
    //   > div {
    //     background: $midWhite;
    //   }
    // }
    // &:hover .inner {
    //   opacity: 1;
    // }
  }
  .project-card {
    height: 100%;
  }
  // equal height cards
  .eq-card.ui.card {
    flex: 1; /* Shrink and grow according to available height */
    flex-basis: 0;
  }
  .center-button {
    /* display: block;
    margin: 0 auto; */
    display: flex;
    justify-content: center;
  }
  button:hover {
    @extend %button-darken-hover;
  }
}
</style>

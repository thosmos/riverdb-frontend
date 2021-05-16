<template>
  <sui-card class="fluid project-card eq-card project-segment">
    <sui-card-content class="m-b-sm project-title">
      <router-link :to="{path: `/data/${AgencyCode}?proj=${project.ProjectID}`}">
        <h5>{{project.Name}}</h5>
      </router-link>
    </sui-card-content>
    <sui-card-content>
      <div>
        <!-- <small>
          <b>{{project.hasData | hasData}}</b>
        </small>
        <p class="m-t-sm">
          From {{project.dataBegins}} up to
          {{project.dataEnds}}
        </p>
        <sui-divider></sui-divider>  -->
        <p>{{project.Description}}</p>
        <!-- <p class="m-t-sm">
          Parameters: {{project.Parameters | measureCount}}
        </p> -->
        <!-- <div class="inner">
            <h1>Explore the Project</h1>
        </div>-->
        <div v-if="project.Parameters && project.Parameters.length > 0" class="m-t-md center-button">
          <router-link :to="{path: `/data/${AgencyCode}?proj=${project.ProjectID}`}">
            <sui-button basic color="blue" circular centered>Explore the data</sui-button>
          </router-link>
        </div>
      </div>
    </sui-card-content>
  </sui-card>
</template>

<script>
import loremIpsum from "lorem-ipsum";
import { mapState } from "vuex";

export default {
  props: {
    project: Object,
    AgencyCode: String
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

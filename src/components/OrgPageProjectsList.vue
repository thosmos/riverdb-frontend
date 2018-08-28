<template>
  <div id="org-page-projects-list">
    <h3 is="sui-header"
        class="ui center aligned"
        s>Projects:</h3>
    <div class="ui centered grid stackable">

      <div v-for="project in info.projects"
           :key="project.title"
           class="six wide tablet four wide computer column">
        <router-link to="SYRCL/RM">
          <sui-card class="fluid project-card eq-card project-segment">
            <sui-card-content class="m-b-sm ">

              <div>
                <h5 class="m-b-sm">{{project.title}}</h5>
                <small>
                  <b>{{project.hasData | hasData}}</b>
                </small>
                <p class="m-t-sm">From {{project.dataBegins}} up to {{project.dataEnds}}</p>
                <p>{{description}}</p>
                <div class="inner">
                  <h1>Explore the Project</h1>
                </div>
              </div>
            </sui-card-content>
          </sui-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import loremIpsum from "lorem-ipsum";

export default {
  props: {
    info: Object
  },
  filters: {
    hasData: function(value) {
      if (value) {
        return "Project has data in database.";
      } else {
        return "There is no public data for this project at this point.";
      }
    }
  },
  computed: {
    description() {
      return loremIpsum({
        count: 5,
        unit: "sentences"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";

#org-page-projects-list {
  div > h5,
  p,
  small {
    color: black;
  }
}
#organization-page {
  .project-segment {
    position: relative;
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
    &:hover {
      > div {
        background: $midWhite;
      }
    }
    &:hover .inner {
      opacity: 1;
    }
  }
  .project-card {
    height: 100%;
  }
  // equal height cards
  .eq-card.ui.card {
    flex: 1; /* Shrink and grow according to available height */
    flex-basis: 0;
  }
}
</style>

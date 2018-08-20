<template>
  <div>
    <h2 is="sui-header"
        class="ui center aligned"
        s>Projects:</h2>
    <div v-for="project in info.projects"
         :key="project.title">
      <div class="m-b-sm project-segment">
        <div is="sui-segment">
          <h5 class="m-b-sm">{{project.title}}</h5>
          <small>{{project.hasData | hasData}}</small>
          <p class="m-t-sm">From {{project.dataBegins}} up to {{project.dataEnds}}</p>
          <p>{{description}}</p>
          <div class="inner">
            <h1>Explore the Project</h1>
          </div>
        </div>
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

<style lang="scss">
@import "../style/style.scss";
#organization-page {
  .project-segment {
    position: relative;
    .ui.segment {
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
      .ui.segment {
        background: $midWhite;
      }
    }
    &:hover .inner {
      opacity: 1;
    }
  }
}
</style>

<template>
  <div id="organization-page"
       v-if="info">
    <sui-container>
      <h1 class="ui center aligned icon header">{{info.name}}</h1>
      <h2 class="ui center aligned icon header">{{info.tagLine}}</h2>
      <sui-image :src="info.logoURL"
                 size="small"
                 floated="left" />
      <h5>{{info.missionStatement}}</h5>
      <p>{{info.about}}</p>
      <hr/>
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
      <hr class="m-b-lg" />
      <sui-grid :columns="2"
                stackable>
        <sui-grid-column>
          <h5>
            <sui-icon name="user
           outline
           " /> {{info.contactPerson}}
          </h5>
        </sui-grid-column>
        <sui-grid-column>
          <h5>
            <sui-icon name="phone
           " /> {{info.phone}}
          </h5>
        </sui-grid-column>
        <sui-grid-column>
          <h5>
            <sui-icon name="envelope
           " /> {{info.email}}
          </h5>
        </sui-grid-column>
        <sui-grid-column>
          <h5>
            <sui-icon name="home
           " /> {{info.URL}}
          </h5>
        </sui-grid-column>
      </sui-grid>

    </sui-container>
  </div>
</template>

<script>
import organizations from "../assets/organizations.js";
import find from "lodash/find";
import loremIpsum from "lorem-ipsum";

export default {
  name: "OrganizationPage",
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
  },
  filters: {
    hasData: function(value) {
      if (value) {
        return "Project has data in database.";
      } else {
        return "There is no data for this project at this point.";
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
    background: rgba(0, 0, 0, 0.8);
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
</style>

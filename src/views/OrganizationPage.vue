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
          </div>
        </div>
      </div>
      <hr/>
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
import lorem from "lorem-ipsum";

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
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";

.project-segment {
  h5 {
    text-decoration: underline;
  }
  &:hover {
    .ui.segment {
      background: $midWhite;
    }
  }
}
</style>

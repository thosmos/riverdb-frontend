<template>
  <!-- <div class="p-t-lg"> -->
  <sui-card class="fluid organization-card eq-card">
    <sui-card-content class="card-abbr">
      <h3>
        {{org.abbreviation}}
      </h3>
    </sui-card-content>

    <div class="img-wrapper">
      <sui-image :src="org.logoURL" />
    </div>
    <sui-card-content>
      <h3>{{org.name}} </h3>
      <h4>{{org.tagLine}}</h4>
      <p>{{org.missionStatement}}</p>
    </sui-card-content>
    <div class="spacer">
      <!-- <sui-card-content extra> -->
      <router-link :to="`/${org.abbreviation}`">
        <sui-button fluid
                    size="big"
                    primary>Visit Organization</sui-button>
      </router-link>
      <!-- </sui-card-content> -->
    </div>
  </sui-card>
  <!-- </div> -->
</template>

<script>
export default {
  name: "OrganizationCard",
  props: {
    org: Object
  }
};
</script>

<style scoped lang="scss">
@import "../style/style.scss";

.organization-card {
  // equal height cards!
  height: 100%;
  div.card-abbr {
    // background: rgba(0, 0, 0, 0.03) !important;
    background: $primaryColor !important;
    color: $offWhite;
    border-bottom: 3px solid $secondaryColor;
    max-height: 3.5rem;
    h3 {
      font-weight: normal;
      text-align: center;
    }
  }
  div.img-wrapper {
    margin: 20px;
    img {
      margin: 0 auto;
      max-height: 200px;
    }
  }
  h3 {
    font-weight: normal;
    text-align: center;
  }
  h4 {
    text-align: center;
  }
  // equal height cards
  .eq-card.ui.card {
    flex: 1; /* Shrink and grow according to available height */
    flex-basis: 0;
  }
  .spacer {
    padding: 10px 15px;
  }
  // div.spacer > a > button {
  //   background: $darkPrimaryColor;
  //   color: $secondaryColor;
  //   &:hover {
  //     color: $offWhite;
  //     background: lighten($darkPrimaryColor, 3%);
  //   }
  // }
}
</style>

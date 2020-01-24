<template>
  <div id="org-page-intro">
    <sui-card-content class="card-header">
      <h2 class="ui center aligned icon header">{{info.name}}</h2>
      <!-- <h2 class="ui center aligned icon header">{{info.tagLine}}</h2> -->
    </sui-card-content>
    <div class="spacer">
      <sui-image :src="info.logoURL"
                 size="small"
                 floated="left" />
      <h5>{{info.missionStatement}}</h5>
      <sui-divider></sui-divider>
      <p>{{info.about}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";
#org-page-intro div.card-header {
  padding: 0.2rem;
  background: $primaryColor;
  background: linear-gradient(
    45deg,
    rgba(0, 132, 203, 1) 0%,
    $lightPrimaryColor 100%
  );
  border-bottom: 3px solid $secondaryColor;
  h1,
  h2 {
    font-weight: normal;
    text-align: center;
    color: $offWhite;
    margin: 0.2rem;
  }
}
.spacer {
  margin: 1rem;
}
</style>

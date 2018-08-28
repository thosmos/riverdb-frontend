<template>
  <sui-card id="org-page-intro"
            class="fluid">
    <sui-card-content class="card-header">
      <h1 class="ui center aligned icon header">{{info.name}}</h1>
      <h2 class="ui center aligned icon header">{{info.tagLine}}</h2>
    </sui-card-content>
    <div class="spacer">
      <sui-image :src="info.logoURL"
                 size="small"
                 floated="left" />
      <h5>{{info.missionStatement}}</h5>
      <sui-divider></sui-divider>
      <p>{{info.about}}</p>
    </div>
  </sui-card>
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
  // background: rgba(0, 0, 0, 0.03) !important;
  background: $primaryColor !important;
  border-bottom: 3px solid $secondaryColor;
  h1,
  h2 {
    font-weight: normal;
    text-align: center;
    color: $offWhite;
    margin: 1rem;
  }
}
.spacer {
  margin: 1rem;
}
</style>

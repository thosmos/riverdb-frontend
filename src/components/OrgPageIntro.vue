<template>
  <div>
    <h1 class="ui center aligned icon header">{{info.name}}</h1>
    <h2 class="ui center aligned icon header">{{info.tagLine}}</h2>
    <sui-image :src="info.logoURL"
               size="small"
               floated="left" />
    <h5>{{info.missionStatement}}</h5>
    <p>{{info.about}}</p>
    <sui-divider></sui-divider>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  }
};
</script>

<style>
</style>

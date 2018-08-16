<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: #eee;
  background-image: url("./assets/background-tiles/waves-0.1.png");
  background-repeat: repeat;
}
</style>

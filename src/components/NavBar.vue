<template>
  <div id="nav">
    <router-link to="/">
      <h1>RiverDB</h1>
    </router-link>
    <h1 v-if="navBarTitle">~</h1>
    <router-link v-if="navBarTitle"
                 :to="`/${navBarTitle}`">
      <h1>{{navBarTitle}}</h1>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NavBar",
  computed: {
    ...mapState({
      organization: state => state.organization
    }),
    navBarTitle: function() {
      if (this.organization.activeOrganization) {
        return this.organization.activeOrganization;
      } else {
        return null;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style/style.scss";

#nav {
  height: 60px;
  // background: $primaryColor;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    40deg,
    rgba(0, 132, 203, 1) 0%,
    $lightPrimaryColor 100%
  );
  border-bottom: 3px solid $secondaryColor;
  color: $offWhite;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    padding: 0 0.5rem;
  }
  > a.router-link-active > h1 {
    color: $offWhite;
    &:hover {
      text-decoration: underline $offWhite;
      color: $offWhite;
    }
  }
}
</style>

<template>
  <div id="nav">
    <router-link to='/'>
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
        return "RiverDB";
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
  a.router-link-active > h1 {
    color: $offWhite;
    &:hover {
      color: $offWhite;
      text-decoration-line: none;
    }
  }
}
</style>

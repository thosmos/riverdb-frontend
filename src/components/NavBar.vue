<template>
  <div id="nav">
    <router-link to="/">
      <span>RiverDB</span>
    </router-link>
    <span v-if="navBarTitle">~</span>
    <router-link v-if="navBarTitle"
                 :to="`/${navBarTitle}`">
      <span>{{navBarTitle}}</span>
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
  height: 40px;
  // background: $primaryColor;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    40deg,
    rgba(0, 132, 203, 1) 50%,
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
  > a.router-link-active > span {
    color: $offWhite;
    &:hover {
      text-decoration: underline $offWhite;
      color: $offWhite;
    }
  }
}
</style>

<template>
  <div id="nav">
    <router-link to="/">
      <span>RiverDB</span>
    </router-link>
    <span>
      <!-- <router-link to="/features">
        <span>Features</span>
      </router-link> -->
      <router-link to="/about">
        <span>About Us</span>
      </router-link>
      <router-link to="/safetoswim">
        <span>Safe To Swim Map</span>
      </router-link>
    </span>
    <!-- <span v-if="navBarTitle">~</span>
    <router-link v-if="navBarTitle"
                 :to="`/${navBarTitle}`">
      <span>{{navBarTitle}}</span>
    </router-link> -->
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
  flex-direction: row;
  justify-content: space-between;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.25rem;
  /* 
  align-items: center;
  justify-content: center;
  */
  h1 {
    padding: 0 0.5rem;
  }
  a > span {
    color: $offWhite;
    padding: 0.75rem;
    &:hover {
      text-decoration: underline $offWhite;
      color: $offWhite;
    }
  }
}

</style>

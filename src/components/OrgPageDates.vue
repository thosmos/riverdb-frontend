<template>
  <div id="org-dates"
       class="">
    <div v-if="html"
         v-html="html.content.rendered"></div>
    <div v-else>
      <h3>No calendar dates have been posted</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { WS_API_IP, WP_USERS } from "../assets/constants.js";

export default {
  name: "OrgPageDates",
  data() {
    return {
      html: null
    };
  },
  computed: {
    ...mapState({
      organization: state => state.organization
    })
  },
  mounted() {
    let baseURL =
      process.env.NODE_ENV === "development"
        ? `http://localhost:8000/wp-json/wp/v2/dates?filter[author]=${
            WP_USERS[this.organization.activeOrganization]
          }`
        : `htttp://${WS_API_IP}:8000/wp-json/wp/v2/dates?filter[author]=${
            WP_USERS[this.organization.activeOrganization]
          }`;

    try {
      axios.get(baseURL).then(res => {
        this.html = res.data[0];
      });
    } catch (err) {
      console.log("WP backend call for /dates failed");
    }
  }
};
</script>

<style >
</style>

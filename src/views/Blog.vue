<template>
  <div id="blog">
    <sui-container>
      <sui-header size="huge"
                  textAlign="center">{{post && post[0].title.rendered}}</sui-header>
      <hr/>
      <div v-if="post"
           v-html="post[0].content.rendered">
      </div>
    </sui-container>
  </div>
</template>

<script>
import { WS_API_IP, WP_USERS } from "../assets/constants.js";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Blog",
  computed: {
    ...mapState({
      organization: state => state.organization
    })
  },
  data() {
    return {
      post: null
    };
  },
  mounted() {
    const { org, slug } = this.$route.params;
    let baseURL =
      process.env.NODE_ENV === "development"
        ? `http://localhost:8000/wp-json/wp/v2/posts?slug=${slug}`
        : `htttp://${WS_API_IP}:8000/wp-json/wp/v2/posts?slug=${slug}`;
    console.log("baseURL", baseURL);
    axios.get(baseURL).then(res => {
      this.post = res.data;
    });
  }
};
</script>

<style lang="scss" >
#blog {
  text-align: justify;
  text-justify: inter-word;
}
.alignleft {
  display: block;
  float: left;
  margin: 0 1.5em 1.5em 0;
}
.alignright {
  display: block;
  float: right;
  margin: 0 0 1.5em 1.5em;
}
.aligncenter {
  clear: both;
  display: block;
  margin: 0 auto 1.5em auto;
}
img {
  height: auto; /* Make sure images are scaled correctly. */
  max-width: 100%; /* Adhere to container width. */
}
a {
  color: rgba(0, 0, 0, 0.87);
}
</style>

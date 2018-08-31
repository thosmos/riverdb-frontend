<template>
  <div id="blog-excerpts">
    <div v-if="posts && posts.length !== 0">

      <div v-for="post in posts"
           id="blog-posts"
           :key="post.date">
        <router-link :to="`/${organization.activeOrganization}/blog/${post.slug}`">
          <h3>{{post.title.rendered}}</h3>
          <div class="ui segment">
            <div v-html="cleanedHtml(post.excerpt.rendered)"></div>
          </div>
        </router-link>
        <hr/>
      </div>
    </div>
    <div v-else>
      <h3>No blog posts yet...</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import striptags from "striptags";
import axios from "axios";
import { WS_API_IP, WP_USERS } from "../assets/constants.js";

export default {
  name: "OrgPageBlog",
  computed: {
    ...mapState({
      organization: state => state.organization
    })
  },
  data() {
    return {
      posts: null
    };
  },
  mounted() {
    let baseURL =
      process.env.NODE_ENV === "development"
        ? `http://localhost:8000/wp-json/wp/v2/posts?filter[author]=${
            WP_USERS[this.organization.activeOrganization]
          }`
        : `htttp://${WS_API_IP}:8000/wp-json/wp/v2/posts?filter[author]=${
            WP_USERS[this.organization.activeOrganization]
          }`;

    try {
      axios.get(baseURL).then(res => {
        this.posts = res.data;
      });
    } catch (err) {
      console.log("WP backend call for /posts failed");
    }
  },
  methods: {
    cleanedHtml: function(dirty) {
      // remove a tag mainly
      let clean = striptags(dirty, ["p"]);
      return clean;
    }
  }
};
</script>

<style lang="scss" scoped >
@import "../style/style.scss";
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
  &:hover {
    color: $primaryColor;
  }
}
#blog-posts > a > div {
  background: $blueBackground;
}
</style>

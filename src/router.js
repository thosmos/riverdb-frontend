import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import OrgPageWrapper from "./views/OrgPageWrapper.vue";
import RMPageWrapper from "./views/RMPageWrapper.vue";
import FlowPageWrapper from "./views/FlowPageWrapper";

Vue.use(Router);

/**
 * Vue-meta for meta tags
 */
import Meta from "vue-meta";
Vue.use(Meta);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/:org",
      // name: "OrganiziationPage",
      component: OrgPageWrapper,
      children: [
        {
          path: "",
          component: () =>
            import(/* webpackChunkName: "org-page" */ "./views/OrganizationPage.vue")
        },
        {
          path: "projects",
          name: "ProjectsPage",
          component: () =>
            import(/* webpackChunkName: "project-page" */ "./views/ProjectsPage.vue")
        },

        {
          path: "RM",
          name: "RMPageWrapper",
          component: RMPageWrapper,
          children: [
            {
              path: "",
              component: () =>
                import(/* webpackChunkName: "rm-page" */ "./views/RMPage.vue")
            },
            {
              path: "stations",
              component: () =>
                import(/* webpackChunkName: "rm-stations" */ "./views/RMStationsPage.vue")
            }
          ]
        },
        {
          path: "Flows",
          name: "FlowsPage",
          component: () =>
            import(/* webpackChunkName: 'flow-page' */ "./views/FlowPageWrapper.vue")
        },
        {
          path: "blog/:slug",
          name: "RMPage",
          component: () =>
            import(/* webpackChunkName: "blog-post" */ "./views/Blog.vue")
        }
      ]
    }
  ]
});

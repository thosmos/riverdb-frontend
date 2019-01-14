import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import OrgPageWrapper from "./views/OrgPageWrapper.vue";
import RMPageWrapper from "./views/RMPageWrapper.vue";
import FlowPageWrapper from "./views/FlowPageWrapper";
import NotFound from "./views/NotFound";
import store from "./store/store.js";

Vue.use(Router);

/**
 * Vue-meta for meta tags
 */
import Meta from "vue-meta";
Vue.use(Meta);

const appRouter = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    // return { x: 0, y: 0 };
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
    // TODO: 404 handling still needs to be better, i.e. .../SYRCLa gets redirect to 404 but .../SYRCLa/RM does not....
    { path: "/404", component: NotFound },
    {
      // FIXME: bad to have toplevel param as it's hard to catch 404.
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
          name: "FlowsPageWrapper",
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
    },
    { path: "*", edirect: "/404" }
  ]
});

appRouter.beforeEach((to, from, next) => {
  // Reset stations if changing from one organization to another....
  if (to.params.org !== from.params.org) {
    store.commit("data/RESET_STATIONS");
    store.commit("selection/RESET_PARAMS");
  }
  next();
  // ...
});

export default appRouter;

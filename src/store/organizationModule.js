import axios from "axios";
import { WS_API_IP, WS_API_PORT } from "../assets/constants";
import {
  LOADING_WATERSHED,
  SET_WATERSHED,
  SET_ACTIVE_ORGANIZATION,
  SET_ORGS,
  SET_PROJECT
} from "./mutationTypes";
import { FETCH_ORGANIZATION_WATERSHED } from "./actionTypes";

const organization = {
  namespaced: true,
  state: {
    watershed: {},
    watershedIsLoading: false,
    activeOrganization: null,
    activeProject: null,
    orgs: null
  },
  /**
   * Mutations
   */
  mutations: {
    /**
     * Sets loading state for loading watershed info from watershedmap like backend
     *
     * @param {Object} state
     * @param {Boolean} value is loading or not
     */
    [LOADING_WATERSHED](state, value) {
      state.watershedIsLoading = value;
    },
    /**
     * Sets list of organizations
     *
     * @param {Object} state
     * @param {Array} orgs is list of all orgs
     */
    [SET_ORGS](state, orgs) {
      const _orgs = {}
      orgs.forEach(org => {
        // const projs = {}
        // org.Projects.forEach(proj => {
        //   projs[proj.ProjectID] = proj
        // })
        //_orgs[org.AgencyCode] = {...org, Projects: projs}
        _orgs[org.AgencyCode] = org
      })
      state.orgs = _orgs;
      console.log("SET_ORGS", _orgs)
      state.watershed = {};
    },
    /**
     * Sets active project ID
     *
     * @param {Object} state
     * @param {String} proj is ProjectID of active project
     */
    [SET_PROJECT](state,proj) {
      state.activeProject = proj;
    },
    /**
     * Sets active organization
     *
     * @param {Object} state
     * @param {String} org
     */
    [SET_ACTIVE_ORGANIZATION](state, org) {
      state.activeOrganization = org;
      // Resets watershed data so there is no remnant of old watershed on hew organization page
      if (state.activeOrganization !== org) {
        state.watershed = {};
      }
    },
    /**
     * Sets watershed from backend
     *
     * @param {Object} state
     * @param {Object} ws
     */
    [SET_WATERSHED](state, ws) {
      state.watershed = ws;
    }
  },
  actions: {
    /**
     * Fetches the watershed data from express-ws backend like in watershedmap.org
     *
     * @param {Object} {commit,state}
     * @param {String} abbreviation organization abbreviation (SYRCL,SSI etc)
     */
    [FETCH_ORGANIZATION_WATERSHED]({ commit, state }, abbreviation) {
      commit("LOADING_WATERSHED", true);
      let url =
        process.env.NODE_ENV === "development"
          ? `http://localhost:${WS_API_PORT}/?river=${abbreviation}`
          : `http://${WS_API_IP}:${WS_API_PORT}/?river=${abbreviation}`;
      axios
        .get(url)
        .then(result => {
          commit("LOADING_WATERSHED", false);
          commit("SET_WATERSHED", result.data.info);
        })
        .catch(err => {});
    }
  }
};

export default organization;

import axios from "axios";
import { WS_API_IP, WS_API_PORT } from "../assets/constants";

const organization = {
  namespaced: true,
  state: {
    watershed: {},
    watershedIsLoading: false
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
    loadingWatershed(state, value) {
      state.watershedIsLoading = value;
    },
    /**
     * Sets watershed from backend
     *
     * @param {Object} state
     * @param {Object} ws
     */
    setWatershed(state, ws) {
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
    fetchOrganizationWatershed({ commit, state }, abbreviation) {
      commit("loadingWatershed", true);
      let url =
        process.env.NODE_ENV === "development"
          ? `http://localhost:${WS_API_PORT}/?river=${abbreviation}`
          : `${WS_API_IP}/?river=${abbreviation}`;
      axios
        .get(url)
        .then(result => {
          commit("loadingWatershed", false);
          commit("setWatershed", result.data.info);
        })
        .catch(err => {});
    }
  }
};

export default organization;

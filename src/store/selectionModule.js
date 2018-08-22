import { SET_ALL_STATIONS } from "./mutationTypes";

const selection = {
  namespaced: true,
  state: {
    allStations: null,
    onlyActiveStations: false // takes all stations no matter if active or not
  },
  /**
   * Mutations
   */
  mutations: {
    /**
     * Sets stations from Apollo query to vuex store so they are available for selection filtering....
     * onlyActive sets if only active stations get included....
     *
     * @param {Object} state
     * @param {Object} { stations, onlyActive }
     */
    [SET_ALL_STATIONS](state, stations) {
      if (state.onlyActiveStations) {
        state.allStations = stations.filter(s => s.Active);
      } else {
        state.allStations = stations;
      }
    }
  },
  actions: {}
};

export default selection;

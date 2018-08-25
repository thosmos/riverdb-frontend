import { SET_ALL_STATIONS } from "./actionTypes";
import {
  ALL_RIVER_FORKS,
  ALL_LOCAL_WATERBODIES,
  ALL_LOCAL_WATERSHEDS,
  ALL_STATION_NAMES,
  SELECT_ACTIVE_PARAM,
  SET_YEAR_RANGE,
  SELECT_SINGLE_YEAR
} from "./mutationTypes";

import {
  getRiverForks,
  getLocalWaterbodies,
  getStationNames
} from "../utils/selectionUtils";

const selection = {
  namespaced: true,
  state: {
    allStations: null,
    onlyActiveStations: false, // takes all stations no matter if active or not
    allForks: null,
    allWaterbodies: null,
    // allWatersheds: null,
    allStationNames: null,
    activeParam: "H2O_Temp",
    selectionRange: null,
    singleYearSelection: false
  },
  /**
   * Mutations
   */
  mutations: {
    [ALL_RIVER_FORKS](state, forks) {
      state.allForks = forks;
    },
    [ALL_LOCAL_WATERSHEDS](state, sheds) {
      state.allWatersheds = sheds;
    },
    [ALL_LOCAL_WATERBODIES](state, bodies) {
      state.allWaterbodies = bodies;
    },
    [ALL_STATION_NAMES](state, names) {
      state.allStationNames = names;
    },
    [SELECT_ACTIVE_PARAM](state, param) {
      state.activeParam = param;
    },
    [SET_YEAR_RANGE](state, range) {
      state.selectionRange = range;
    },
    [SELECT_SINGLE_YEAR](state, value) {
      state.singleYearSelection = value;
    }
  },
  actions: {
    /**
     * Sets stations from Apollo query to vuex store so they are available for selection filtering....
     * onlyActive sets if only active stations get included....
     *
     * @param {Object} state
     * @param {Object} { stations, onlyActive }
     */
    [SET_ALL_STATIONS]({ commit, state }, stations) {
      if (state.onlyActiveStations) {
        state.allStations = stations.filter(s => s.Active);
      } else {
        state.allStations = stations;
      }
      commit("ALL_RIVER_FORKS", getRiverForks(stations));
      // commit("ALL_LOCAL_WATERSHEDS", getLocalWatersheds(stations));
      commit("ALL_LOCAL_WATERBODIES", getLocalWaterbodies(stations));
      commit("ALL_STATION_NAMES", getStationNames(stations));
    }
  }
};

export default selection;

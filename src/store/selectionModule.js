import { SET_ALL_STATIONS } from "./actionTypes";
import {
  ALL_RIVER_FORKS,
  ALL_LOCAL_WATERBODIES,
  ALL_LOCAL_WATERSHEDS,
  ALL_STATION_NAMES,
  SELECT_ACTIVE_PARAM,
  SELECT_SECONDARY_PARAM,
  SET_YEAR_RANGE,
  SELECT_SINGLE_YEAR,
  SET_CHART_TYPE,
  RESET_PARAMS,
  SET_PROJECT,
  SET_SAMPLE_TYPE
} from "./mutationTypes";

import {
  getRiverForks,
  getLocalWaterbodies,
  getStationNames
} from "../utils/selectionUtils";

import router from "../router";

const selection = {
  namespaced: true,
  state: {
    allStations: null,
    onlyActiveStations: false, // takes all stations no matter if active or not
    allForks: null,
    allWaterbodies: null,
    // allWatersheds: null,
    allStationNames: null,
    activeParam: null,
    secondaryParam: null,
    selectionRange: null,
    singleYearSelection: false,
    chartType: "LINE_MULTI",
    project: null,
    sampleType: "FieldMeasure"
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
      let current = router.history.current;
      router.replace({ ...current, query: { ...current.query, param: param } });
      state.activeParam = param;
    },
    [SELECT_SECONDARY_PARAM](state, param) {
      let current = { ...router.history.current };
      if (!param) {
        param = "";
      }
      router.replace({
        ...current,
        query: { ...current.query, secondaryParam: param }
      });
      state.secondaryParam = param;
    },
    [SET_YEAR_RANGE](state, range) {
      state.selectionRange = range;
      let current = { ...router.history.current };
      if (range[0] && range[1]) {
        router.replace({
          ...current,
          query: { ...current.query, yearRange: `${range[0]},${range[1]}` }
        });
      } else {
        // INFO: no stations selected, no yearRange, therefore remove yearRange query, setting undefined etc doesn't work so setting it to ''
        router.replace({
          ...current,
          query: { ...current.query, yearRange: "" }
        });
      }
    },
    [SELECT_SINGLE_YEAR](state, value) {
      state.singleYearSelection = value;
    },
    [SET_CHART_TYPE](state, type) {
      let current = router.history.current;
      // TODO: maybe remove yearRange query for boxplots?
      router.replace({
        ...current,
        query: { ...current.query, chartType: type }
      });
      state.chartType = type;
    },
    [SET_PROJECT](state, project) {
      state.project = project;
      let current = router.history.current;
      router.replace({
        ...current,
        query: { ...current.query, project: project.ProjectID }
      });
    },
    [SET_SAMPLE_TYPE](state, sampleType) {
      state.sampleType = sampleType;
      let current = router.history.current;
      router.replace({
        ...current,
        query: { ...current.query, sampleType: sampleType.value }
      });
    },
    [RESET_PARAMS](state) {
      state.activeParam = null;
      // let current = router.history.current;
      // router.replace({
      //   ...current,
      //   query: { ...current.query, param: null }
      // });
    },
    
  },
  actions: {
    /**
     * Sets stations from Apollo query to vuex store so they are available for selection filtering....
     * onlyActive sets if only active stations get included....
     *
     * @param {Object} state
     * @param {Object} { stations, onlyActive }
     */
     [SET_ALL_STATIONS]({state, commit}, stations) {
      if (state.onlyActiveStations) {
        state.allStations = stations.filter(s => s.Active);
      } else {
        state.allStations = stations;
      }
      //commit("ALL_RIVER_FORKS", getRiverForks(stations));
      // commit("ALL_LOCAL_WATERSHEDS", getLocalWatersheds(stations));
      //commit("ALL_LOCAL_WATERBODIES", getLocalWaterbodies(stations));
      commit(ALL_STATION_NAMES, getStationNames(stations));
    }
  }
};

export default selection;

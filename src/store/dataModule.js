import { ADD_STATION_DATA, FETCH_STATION_DATA, ADD_LOGGER_DATA } from "./actionTypes";
import {
  REMOVE_STATION,
  SELECT_STATION,
  PROVIDE_APOLLO,
  GENERATE_KEY,
  RESET_STATIONS,
  RESET_PARAMS,
  SET_PROJECT,
  SET_PROJECTS
} from "./mutationTypes";
import { GET_STATION_DATA, GET_PROJECT, GET_LOGGER_DATA } from "../apollo/queries.js";

import Station from "../utils/Station";
import findIndex from "lodash/findIndex";
import uniq from "lodash/uniq";
import find from "lodash/find";
import shortid from "shortid";

import router from "../router";

const data = {
  namespaced: true,
  state: {
    loadedStations: [],
    selectedStation: null,
    startYear: null,
    endYear: null,
    apollo: null,
    uniqueKey: "abc",
    activeProject: null,
    projects: null
  },
  mutations: {
    [SELECT_STATION](state, stationRef) {
      if (stationRef === null) {
        // No stations loaded
        state.selectedStation = null;
        let current = { ...router.history.current };
        router.replace({
          ...current,
          query: {
            ...current.query,
            selectedStation: ""
          }
        });
        return;
      }
      let index = findIndex(state.loadedStations, o => o.info.id === stationRef);
      state.selectedStation = state.loadedStations[index];
      let current = { ...router.history.current };
      router.replace({
        ...current,
        query: {
          ...current.query,
          selectedStation: stationRef
        }
      });
    },
    [PROVIDE_APOLLO](state, apollo) {
      state.apollo = apollo;
    },
    [GENERATE_KEY](state) {
      state.uniqueKey = shortid.generate();
    },
    [RESET_STATIONS](state) {
      state.endYear = null;
      state.startYear = null;
      state.selectedStation = null;
      state.loadedStations = [];
      let current = router.history.current;
      router.replace({
        ...current,
        query: { ...current.query, stations: "" }
      });
    },
    [SET_PROJECTS](state, projects) {
      state.projects = projects;
      console.log("SET_PROJECTS", projects);
      state.activeProject = projects.length > 0 ? projects[0] : null;
      if (state.activeProject) {
        let current = router.history.current;
        router.replace({
          ...current,
          query: { ...current.query, project: state.activeProject.ProjectID }
        });
      }
    },
    [SET_PROJECT](state, proj) {
      console.log("SET_PROJECT", proj);
      state.activeProject = proj;
      let current = router.history.current;
      router.replace({
        ...current,
        query: {
          ...current.query,
          project: state.activeProject.ProjectID
        }
      });
    }
  },
  actions: {
    [REMOVE_STATION]({ commit, state }, stationRef) {
      console.log("Remove Station ID", stationRef);
      let index = findIndex(state.loadedStations, o => o.info.id === stationRef);
      let toBeRemovedStation = find(state.loadedStations, o => o.info.id === stationRef);
      // Check if to be removed station is also selectedStation
      let selectedStationCode = state.selectedStation.info.id;
      state.loadedStations.splice(index, 1);
      const loadedStationsStr = state.loadedStations.map(s => s.info.id).join(",");
      let current = router.history.current;
      router.replace({
        ...current,
        query: { ...current.query, stations: loadedStationsStr }
      });
      if (toBeRemovedStation.info.id === selectedStationCode) {
        if (state.loadedStations.length !== 0) {
          // Not the last loadedStation
          state.selectedStation = state.loadedStations[0];
          console.log("state.selectedStation", state.selectedStation);
          // Calculate minmax year
          let years = [];
          state.loadedStations.map(s => {
            years.push(s.meta.totalYearRange.startYear);
            years.push(s.meta.totalYearRange.endYear);
          });
          state.startYear = Math.min(...years);
          state.endYear = Math.max(...years);
          commit("selection/SET_YEAR_RANGE", [state.startYear, state.endYear], {
            root: true
          });
          commit("SELECT_STATION", state.selectedStation.info.id);
        } else {
          //  no more station loaded, set yearRange && selectedStation to null,
          state.selectedStation = null;
          state.startYear = null;
          state.endYear = null;

          commit("selection/SET_YEAR_RANGE", [state.startYear, state.endYear], {
            root: true
          });
          commit("SELECT_STATION", null);
          commit("selection/SELECT_SECONDARY_PARAM", null, { root: true });
        }
      }
    },
    [ADD_LOGGER_DATA](
      { commit, state, rootState },
      { info, data, selectedStation, param }
    ) {
      console.log("ADD_LOGGER_DATA", info, data, param);
      const opts = {
        type: "logger",
        param
      };
      let newStation = new Station(info, data, opts);

      console.log("NEW STATION", newStation);
      let ids = state.loadedStations.map(s => s.info.id);
      if (!ids.includes(newStation.info.id)) {
        state.loadedStations.push(newStation);
        ids.push(newStation.info.id);
      }
      const loadedStationsStr = ids.join(",");
      let current = router.history.current;
      router.replace({
        ...current,
        query: { ...current.query, stations: loadedStationsStr }
      });
      // Select newly added Station or station based on query
      if (selectedStation) {
        commit("SELECT_STATION", selectedStation);
      } else {
        commit("SELECT_STATION", info.id);
      }
      // Get minYear and maxYear
      let years = [];
      state.loadedStations.map(s => {
        years.push(s.meta.totalYearRange.startYear);
        years.push(s.meta.totalYearRange.endYear);
      });
      state.startYear = Math.min(...years);
      state.endYear = Math.max(...years);
      if (!current.query.secondaryParam || state.loadedStations.length > 1) {
        // Allways reset secondary param when adding station
        commit("selection/SELECT_SECONDARY_PARAM", null, { root: true });
      }
      // set new year range with updated value in selection Vuex
      if (rootState.selection.singleYearSelection) {
        // if singleYearSelection, set year to last
        commit("selection/SET_YEAR_RANGE", [state.endYear, state.endYear], {
          root: true
        });
      } else {
        // otherwise set setRange
        commit("selection/SET_YEAR_RANGE", [state.startYear, state.endYear], {
          root: true
        });
      }
    },
    [ADD_STATION_DATA]({ commit, state, rootState }, { info, data, selectedStation }) {
      console.log("ADD_STATION_DATA", info, data, selectedStation);

      let newStation = new Station(info, data, {});

      console.log("NEW STATION", newStation);
      let ids = state.loadedStations.map(s => s.info.id);
      if (!ids.includes(newStation.info.id)) {
        state.loadedStations.push(newStation);
        ids.push(newStation.info.id);
      }
      const loadedStationsStr = ids.join(",");
      let current = router.history.current;
      router.replace({
        ...current,
        query: { ...current.query, stations: loadedStationsStr }
      });
      // Select newly added Station or station based on query
      if (selectedStation) {
        commit("SELECT_STATION", selectedStation);
      } else {
        commit("SELECT_STATION", info.id);
      }
      // Get minYear and maxYear
      let years = [];
      state.loadedStations.map(s => {
        years.push(s.meta.totalYearRange.startYear);
        years.push(s.meta.totalYearRange.endYear);
      });
      state.startYear = Math.min(...years);
      state.endYear = Math.max(...years);
      if (!current.query.secondaryParam || state.loadedStations.length > 1) {
        // Allways reset secondary param when adding station
        commit("selection/SELECT_SECONDARY_PARAM", null, { root: true });
      }
      // set new year range with updated value in selection Vuex
      if (rootState.selection.singleYearSelection) {
        // if singleYearSelection, set year to last
        commit("selection/SET_YEAR_RANGE", [state.endYear, state.endYear], {
          root: true
        });
      } else {
        // otherwise set setRange
        commit("selection/SET_YEAR_RANGE", [state.startYear, state.endYear], {
          root: true
        });
      }
    },
    [FETCH_STATION_DATA]({ commit, dispatch, state }, station) {
      const stationRef = station.id;
      console.log("loggerRef", stationRef);
      commit("ui/IS_LOADING", true, { root: true });

      const activeProject = state.activeProject;
      const projType =
        activeProject && activeProject.ProjectType && activeProject.ProjectType.ident;
      const loggerParam = activeProject && activeProject.Parameters[0];

      if (projType === "logger") {
        console.log("GET_LOGGER_DATA");
        state.apollo
          .query({
            query: GET_LOGGER_DATA,
            variables: {
              stationRef
            }
          })
          .then(res => {
            commit("ui/CLEAR_ERROR_MSG", "selection", { root: true });
            commit("ui/IS_LOADING", false, { root: true });
            if (find(state.loadedStations, o => stationRef === o.info.id)) {
              commit(
                "ui/SET_ERROR_MSG",
                {
                  section: "selection",
                  msg: `Station is already selected`
                },
                { root: true }
              );
            } else {
              dispatch("ADD_LOGGER_DATA", {
                info: station,
                data: res.data,
                param: loggerParam
              });
            }
          })
          .catch(() => {
            commit(
              "ui/SET_ERROR_MSG",
              {
                section: "selection",
                msg: `Couldn't fetch logger data`
              },
              { root: true }
            );
          });
      } else {
        state.apollo
          .query({
            query: GET_STATION_DATA,
            variables: {
              stationRef
            }
          })
          .then(res => {
            console.log("GOT STATION DATA", res);

            commit("ui/CLEAR_ERROR_MSG", "selection", { root: true });
            commit("ui/IS_LOADING", false, { root: true });
            if (find(state.loadedStations, o => stationRef === o.info.id)) {
              commit(
                "ui/SET_ERROR_MSG",
                {
                  section: "selection",
                  msg: `Station is already selected`
                },
                { root: true }
              );
            } else {
              dispatch("ADD_STATION_DATA", {
                info: station,
                data: res.data
              });
            }
          })
          .catch(() => {
            commit(
              "ui/SET_ERROR_MSG",
              {
                section: "selection",
                msg: `Couldn't fetch station data`
              },
              { root: true }
            );
          });
      }
    }
  }
};

export default data;

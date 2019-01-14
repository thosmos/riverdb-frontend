import { ADD_STATION_DATA, FETCH_STATION_DATA } from "./actionTypes";
import {
  REMOVE_STATION,
  SELECT_STATION,
  PROVIDE_APOLLO,
  GENERATE_KEY,
  RESET_STATIONS,
  RESET_PARAMS
} from "./mutationTypes";
import { GET_STATION_DATA } from "../apollo/queries.js";

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
    uniqueKey: "abc"
  },
  mutations: {
    [SELECT_STATION](state, StationCode) {
      if (StationCode === null) {
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
      let index = findIndex(
        state.loadedStations,
        o => o.info.StationCode === StationCode
      );
      state.selectedStation = state.loadedStations[index];
      let current = { ...router.history.current };
      router.replace({
        ...current,
        query: {
          ...current.query,
          selectedStation: StationCode
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
    }
  },
  actions: {
    [REMOVE_STATION]({ commit, state }, StationCode) {
      console.log("StationCode", StationCode);
      let index = findIndex(
        state.loadedStations,
        o => o.info.StationCode === StationCode
      );
      let toBeRemovedStation = find(
        state.loadedStations,
        o => o.info.StationCode === StationCode
      );
      // Check if to be removed station is also selectedStation
      let selectedStationCode = state.selectedStation.info.StationCode;
      state.loadedStations.splice(index, 1);
      const loadedStationsStr = state.loadedStations
        .map(s => s.info.StationCode)
        .join(",");
      let current = router.history.current;
      router.replace({
        ...current,
        query: { ...current.query, stations: loadedStationsStr }
      });
      if (toBeRemovedStation.info.StationCode === selectedStationCode) {
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
          commit("SELECT_STATION", state.selectedStation.info.StationCode);
        } else {
          //  no more station loaded, set yearRange && selectedStation to null,
          state.selectedStation = null;
          state.startYear = null;
          state.endYear = null;
          commit("selection/SET_YEAR_RANGE", [state.startYear, state.endYear], {
            root: true
          });
          commit("SELECT_STATION", null);
        }
        commit;
      }
    },
    [ADD_STATION_DATA](
      { commit, state, rootState },
      { info, data, selectedStation }
    ) {
      let newStation = new Station(info, data);
      state.loadedStations.push(newStation);
      const loadedStationsStr = uniq(state.loadedStations)
        .map(s => s.info.StationCode)
        .join(",");
      let current = router.history.current;
      router.replace({
        ...current,
        query: { ...current.query, stations: loadedStationsStr }
      });
      // Select newly added Station or station based on query
      if (selectedStation) {
        commit("SELECT_STATION", selectedStation);
      } else {
        commit("SELECT_STATION", info.StationCode);
      }
      // Get minYear and maxYear
      let years = [];
      state.loadedStations.map(s => {
        years.push(s.meta.totalYearRange.startYear);
        years.push(s.meta.totalYearRange.endYear);
      });
      state.startYear = Math.min(...years);
      state.endYear = Math.max(...years);
      // Allways reset secondary param when adding station
      commit("selection/SELECT_SECONDARY_PARAM", null, { root: true });
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
      const id = station.StationCode;
      console.log("id", id);
      commit("ui/IS_LOADING", true, { root: true });
      // if (!this.loadedStations[id]) {
      state.apollo
        .query({
          query: GET_STATION_DATA,
          variables: {
            stationCode: id
          }
        })
        .then(res => {
          commit("ui/CLEAR_ERROR_MSG", "selection", { root: true });
          commit("ui/IS_LOADING", false, { root: true });
          if (find(state.loadedStations, o => id === o.info.StationID)) {
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
};

export default data;

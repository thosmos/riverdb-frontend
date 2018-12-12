import { ADD_STATION_DATA, FETCH_STATION_DATA } from "./actionTypes";
import {
  REMOVE_STATION,
  SELECT_STATION,
  PROVIDE_APOLLO,
  GENERATE_KEY,
  RESET_STATIONS
} from "./mutationTypes";
import { GET_STATION_DATA } from "../apollo/queries.js";

import Station from "../utils/Station";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import shortid from "shortid";

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
    [SELECT_STATION](state, StationID) {
      let index = findIndex(
        state.loadedStations,
        o => o.info.StationID === StationID
      );
      state.selectedStation = state.loadedStations[index];
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
    [REMOVE_STATION]({ state }, StationID) {
      let index = findIndex(
        state.loadedStations,
        o => o.info.StationID === StationID
      );
      let toBeRemovedStation = find(
        state.loadedStations,
        o => o.info.StationID === StationID
      );
      // Check if to be removed station is also selectedStation
      let selectedStationID = state.selectedStation.info.StationID;
      state.loadedStations.splice(index, 1);
      if (toBeRemovedStation.info.StationID === selectedStationID) {
        if (state.loadedStations.length !== 0) {
          // Not the last loadedStation
          state.selectedStation = state.loadedStations[0];
          // Calculate minmax year
          let years = [];
          state.loadedStations.map(s => {
            years.push(s.meta.totalYearRange.startYear);
            years.push(s.meta.totalYearRange.endYear);
          });
          state.startYear = Math.min(...years);
          state.endYear = Math.max(...years);
        } else {
          // last loadedStation, set selectedStation to null.
          state.selectedStation = null;
          state.startYear = null;
          state.endYear = null;
        }
      }
    },
    [ADD_STATION_DATA]({ commit, state, rootState }, { info, data }) {
      let newStation = new Station(info, data);
      state.loadedStations.push(newStation);
      // Select newly added Station
      commit("SELECT_STATION", info.StationID);
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
      const id = station.StationID;
      commit("ui/IS_LOADING", true, { root: true });
      // if (!this.loadedStations[id]) {
      state.apollo
        .query({
          query: GET_STATION_DATA,
          variables: {
            station: id
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

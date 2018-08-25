import { ADD_STATION_DATA } from "./actionTypes";
import { REMOVE_STATION, SELECT_STATION } from "./mutationTypes";

import Station from "../utils/Station";
import findIndex from "lodash/findIndex";
import find from "lodash/find";

const data = {
  namespaced: true,
  state: {
    loadedStations: [],
    selectedStation: null,
    startYear: null,
    endYear: null
  },
  mutations: {
    [SELECT_STATION](state, StationID) {
      let index = findIndex(
        state.loadedStations,
        o => o.info.StationID === StationID
      );
      state.selectedStation = state.loadedStations[index];
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
          console.log("years", years);
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
    [ADD_STATION_DATA]({ commit, state }, { info, data }) {
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
      // set new year range with updated value in selection Vuex
      commit("selection/SET_YEAR_RANGE", [state.startYear, state.endYear], {
        root: true
      });
    }
  }
};

export default data;

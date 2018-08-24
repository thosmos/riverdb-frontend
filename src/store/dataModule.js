import { ADD_STATION_DATA } from "./actionTypes";
import { REMOVE_STATION, SELECT_STATION } from "./mutationTypes";

import Station from "../utils/Station";
import findIndex from "lodash/findIndex";
import find from "lodash/find";

const data = {
  namespaced: true,
  state: {
    loadedStations: [],
    selectedStation: null
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
        } else {
          // last loadedStation, set selectedStation to null.
          state.selectedStation = null;
        }
      }
    },
    [ADD_STATION_DATA]({ commit, state }, { info, data }) {
      let newStation = new Station(info, data);
      state.loadedStations.push(newStation);
      // Select newly added Station
      commit("SELECT_STATION", info.StationID);
    }
  }
};

export default data;

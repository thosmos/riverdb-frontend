import { ADD_STATION_DATA } from "./actionTypes";
import { REMOVE_STATION, SELECT_STATION } from "./mutationTypes";

import Station from "../utils/Station";
import findIndex from "lodash/findIndex";

const data = {
  namespaced: true,
  state: {
    loadedStations: [],
    selectedStation: null
  },
  mutations: {
    [REMOVE_STATION](state, StationID) {
      let index = findIndex(
        state.loadedStations,
        o => o.info.StationID === StationID
      );
      state.loadedStations.splice(index, 1);
    },
    [SELECT_STATION](state, StationID) {
      let index = findIndex(
        state.loadedStations,
        o => o.info.StationID === StationID
      );
      state.selectedStation = state.loadedStations[index];
    }
  },
  actions: {
    [ADD_STATION_DATA]({ commit, state }, { info, data }) {
      // console.log("station", station);
      let newStation = new Station(info, data);
      state.loadedStations.push(newStation);
      // Select newly added Station
      commit("SELECT_STATION", info.StationID);
    }
  }
};

export default data;

import { ADD_STATION_DATA } from "./actionTypes";
import { REMOVE_STATION } from "./mutationTypes";

import Station from "../utils/Station";
import findIndex from "lodash/findIndex";

const data = {
  namespaced: true,
  state: {
    loadedStations: []
  },
  mutations: {
    [REMOVE_STATION](state, StationID) {
      let index = findIndex(
        state.loadedStations,
        o => o.info.StationID === StationID
      );
      state.loadedStations.splice(index, 1);
    }
  },
  actions: {
    [ADD_STATION_DATA]({ commit, state }, { info, data }) {
      // console.log("station", station);
      let newStation = new Station(info, data);
      state.loadedStations.push(newStation);
    }
  }
};

export default data;

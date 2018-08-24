import { ADD_STATION_DATA } from "./actionTypes";

const data = {
  namespaced: true,
  state: {
    loadedStations: []
  },
  mutations: {},
  actions: {
    [ADD_STATION_DATA]({ commit, state }, { info, data }) {
      // console.log("station", station);
      state.loadedStations.push({ info, data });
    }
  }
};

export default data;

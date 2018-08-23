import { ADD_STATION_DATA } from "./actionTypes";

const data = {
  namespaced: true,
  state: {
    loadedStations: []
  },
  mutations: {},
  actions: {
    [ADD_STATION_DATA]({ commit, state }, { id, data }) {
      console.log("station", station);
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      state.loadedStations.push({ id, data });
    }
  }
};

export default data;

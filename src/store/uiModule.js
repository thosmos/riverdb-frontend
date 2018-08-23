import { SET_ERROR_MSG, CLEAR_ERROR_MSG, CLEAR_ALL_MSG } from "./mutationTypes";

const ui = {
  namespaced: true,
  state: {
    errorMsg: null,
    infoMsg: null
  },
  mutations: {
    [SET_ERROR_MSG](state, msg) {
      state.errorMsg = msg;
    },
    [CLEAR_ERROR_MSG](state) {
      state.errorMsg = null;
    },
    [CLEAR_ALL_MSG](state) {
      state.errorMsg = null;
      state.infoMsg = null;
    }
  },
  actions: {}
};

export default ui;

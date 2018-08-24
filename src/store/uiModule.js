import {
  SET_ERROR_MSG,
  CLEAR_ERROR_MSG,
  CLEAR_ALL_MSG,
  IS_LOADING
} from "./mutationTypes";

const ui = {
  namespaced: true,
  state: {
    errorMsg: {},
    infoMsg: null,
    isLoading: false
  },
  mutations: {
    [SET_ERROR_MSG](state, { section, msg }) {
      state.errorMsg[section] = msg;
    },
    [CLEAR_ERROR_MSG](state, section) {
      state.errorMsg[section] = null;
    },
    [CLEAR_ALL_MSG](state) {
      state.errorMsg = null;
      state.infoMsg = null;
    },
    [IS_LOADING](state, value) {
      state.isLoading = value;
    }
  },
  actions: {}
};

export default ui;

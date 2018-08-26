import {
  SET_ERROR_MSG,
  CLEAR_ERROR_MSG,
  CLEAR_ALL_MSG,
  IS_LOADING,
  SHOW_YEAR_SELECTION
} from "./mutationTypes";

const ui = {
  namespaced: true,
  state: {
    errorMsg: {},
    infoMsg: null,
    isLoading: false,
    showYearSelection: true
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
    },
    [SHOW_YEAR_SELECTION](state, value) {
      state.showYearSelection = value;
    }
  },
  actions: {}
};

export default ui;

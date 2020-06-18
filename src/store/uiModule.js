import {
  SET_ERROR_MSG,
  CLEAR_ERROR_MSG,
  CLEAR_ALL_MSG,
  IS_LOADING,
  SHOW_YEAR_SELECTION,
  CLEAR_COOKIE_MSG,
  TAKE_TOUR,
  TOGGLE_STATION_INFO_MODAL,
  TOGGLE_SAFETOSWIM_MODAL
} from "./mutationTypes";

const ui = {
  namespaced: true,
  state: {
    errorMsg: {},
    infoMsg: null,
    isLoading: false,
    showYearSelection: true,
    showCookieMsg: true,
    takeTour: false,
    showInfoModal: false,
    showInfoModalStation: null,
    showSafetoswim: false
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
    },
    [CLEAR_COOKIE_MSG](state) {
      state.showCookieMsg = false;
    },
    [TAKE_TOUR](state) {
      state.takeTour = true;
    },
    [TOGGLE_STATION_INFO_MODAL](state, station) {
      state.showInfoModal = !state.showInfoModal;
      if (!state.showInfoModal) {
        state.showInfoModalStation = null;
      } else {
        state.showInfoModalStation = station;
      }
    },
    [TOGGLE_SAFETOSWIM_MODAL](state, station) {
      state.showSafetoswim = !state.showSafetoswim;
      if (!state.showSafetoswim) {
        state.showInfoModalStation = null;
      } else {
        state.showInfoModalStation = station;
      }
    }
  },
  actions: {}
};

export default ui;

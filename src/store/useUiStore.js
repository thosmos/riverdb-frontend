import { create } from 'zustand'

const useUiStore = create((set) => ({
  errorMsg: {},
  infoMsg: null,
  isLoading: false,
  showYearSelection: true,
  showCookieMsg: true,
  takeTour: false,
  showInfoModal: false,
  showInfoModalStation: null,
  showSafetoswim: false,

  setErrorMsg: (section, msg) => set((state) => ({
    errorMsg: { ...state.errorMsg, [section]: msg }
  })),
  clearErrorMsg: (section) => set((state) => ({
    errorMsg: { ...state.errorMsg, [section]: null }
  })),
  clearAllMsg: () => set({ errorMsg: {}, infoMsg: null }),
  setIsLoading: (value) => set({ isLoading: value }),
  setShowYearSelection: (value) => set({ showYearSelection: value }),
  clearCookieMsg: () => set({ showCookieMsg: false }),
  setTakeTour: (value) => set({ takeTour: value }),
  toggleStationInfoModal: (station) => set((state) => ({
    showInfoModal: !state.showInfoModal,
    showInfoModalStation: !state.showInfoModal ? station : null
  })),
  toggleSafetoswimModal: (station) => set((state) => ({
    showSafetoswim: !state.showSafetoswim,
    showInfoModalStation: !state.showSafetoswim ? station : null
  }))
}))

export default useUiStore;

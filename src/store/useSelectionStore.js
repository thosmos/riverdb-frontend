import { create } from 'zustand'
import { getStationNames } from '../utils/selectionUtils'

const useSelectionStore = create((set, get) => ({
  allStations: null,
  onlyActiveStations: false,
  allForks: null,
  allWaterbodies: null,
  allStationNames: null,
  activeParam: null,
  secondaryParam: null,
  selectionRange: null,
  singleYearSelection: false,
  chartType: "LINE_MULTI",
  project: null,
  sampleType: "FieldMeasure",

  setAllStations: (stations) => {
    const { onlyActiveStations } = get()
    const allStations = onlyActiveStations ? stations.filter(s => s.Active) : stations
    set({
      allStations,
      allStationNames: getStationNames(stations)
    })
  },

  setActiveParam: (param) => set({ activeParam: param }),
  setSecondaryParam: (param) => set({ secondaryParam: param }),
  setYearRange: (range) => set({ selectionRange: range }),
  setSingleYearSelection: (value) => set({ singleYearSelection: value }),
  setChartType: (type) => set({ chartType: type }),
  setProject: (project) => set({ project }),
  setSampleType: (sampleType) => set({ sampleType }),
  resetParams: () => set({ activeParam: null }),
  clearParam: () => set({ activeParam: null, secondaryParam: null })
}))

export default useSelectionStore

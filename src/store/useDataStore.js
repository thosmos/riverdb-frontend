import { create } from 'zustand'
import Station from '../utils/Station'
import findIndex from 'lodash/findIndex'
import find from 'lodash/find'
import shortid from 'shortid'

const useDataStore = create((set, get) => ({
  loadedStations: [],
  selectedStation: null,
  startYear: null,
  endYear: null,
  uniqueKey: "abc",
  activeProject: null,
  projects: null,

  selectStation: (stationRef) => {
    const { loadedStations } = get()
    if (stationRef === null) {
      set({ selectedStation: null })
      return
    }
    const index = findIndex(loadedStations, o => o.info.id === stationRef)
    set({ selectedStation: loadedStations[index] })
  },

  generateKey: () => set({ uniqueKey: shortid.generate() }),

  resetStations: () => set({
    endYear: null,
    startYear: null,
    selectedStation: null,
    loadedStations: []
  }),

  setProjects: (projects) => {
    const activeProject = projects.length > 0 ? projects[0] : null
    set({ projects, activeProject })
  },

  setActiveProject: (proj) => set({ activeProject: proj }),

  removeStation: (stationRef) => {
    const { loadedStations, selectedStation } = get()
    const index = findIndex(loadedStations, o => o.info.id === stationRef)
    const toBeRemovedStation = find(loadedStations, o => o.info.id === stationRef)
    const selectedStationCode = selectedStation?.info?.id

    const newLoadedStations = [...loadedStations]
    newLoadedStations.splice(index, 1)

    if (toBeRemovedStation.info.id === selectedStationCode) {
      if (newLoadedStations.length !== 0) {
        const newSelectedStation = newLoadedStations[0]
        const years = []
        newLoadedStations.map(s => {
          years.push(s.meta.totalYearRange.startYear)
          years.push(s.meta.totalYearRange.endYear)
        })
        const startYear = Math.min(...years)
        const endYear = Math.max(...years)
        set({
          loadedStations: newLoadedStations,
          selectedStation: newSelectedStation,
          startYear,
          endYear
        })
        // Note: selection store range might need update outside
      } else {
        set({
          loadedStations: newLoadedStations,
          selectedStation: null,
          startYear: null,
          endYear: null
        })
      }
    } else {
      set({ loadedStations: newLoadedStations })
    }
  },

  addStationData: (info, data, opts = {}) => {
    const { loadedStations, singleYearSelection } = get()
    const newStation = new Station(info, data, opts)
    let newLoadedStations = [...loadedStations]
    const ids = newLoadedStations.map(s => s.info.id)
    if (!ids.includes(newStation.info.id)) {
      newLoadedStations.push(newStation)
    }

    const years = []
    newLoadedStations.map(s => {
      years.push(s.meta.totalYearRange.startYear)
      years.push(s.meta.totalYearRange.endYear)
    })
    const startYear = Math.min(...years)
    const endYear = Math.max(...years)

    set({
      loadedStations: newLoadedStations,
      selectedStation: newStation,
      startYear,
      endYear
    })

    return { startYear, endYear }
  }
}))

export default useDataStore

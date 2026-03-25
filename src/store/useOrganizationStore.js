import { create } from 'zustand'
import axios from 'axios'
import { WS_API_IP, WS_API_PORT } from '../assets/constants'

const useOrganizationStore = create((set, get) => ({
  watershed: {},
  watershedIsLoading: false,
  activeOrganization: null,
  orgs: null,

  setOrgs: (orgs) => {
    const _orgs = {}
    orgs.forEach(org => {
      _orgs[org.AgencyCode] = org
    })
    set({ orgs: _orgs, watershed: {} })
  },

  setActiveOrganization: (org) => {
    const { activeOrganization } = get()
    const newState = { activeOrganization: org }
    if (activeOrganization !== org) {
      newState.watershed = {}
    }
    set(newState)
  },

  setWatershed: (ws) => set({ watershed: ws }),

  fetchOrganizationWatershed: async (abbreviation) => {
    set({ watershedIsLoading: true })
    const url = import.meta.env.DEV
      ? `http://localhost:${WS_API_PORT}/?river=${abbreviation}`
      : `http://${WS_API_IP}:${WS_API_PORT}/?river=${abbreviation}`

    try {
      const result = await axios.get(url)
      set({ watershedIsLoading: false, watershed: result.data.info })
    } catch (err) {
      set({ watershedIsLoading: false })
    }
  }
}))

export default useOrganizationStore

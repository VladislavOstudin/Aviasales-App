import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  searchId: '',
  tickets: [],
  displayedTickets: [],
  stop: false,
  displayCount: 5,
  loading: false,
  error: null,
}

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    getSearchId(state, action) {
      state.searchId = action.payload
    },
    getTickets(state, action) {
      const newBatch = action.payload.tickets.map((ticket) => ({ ...ticket, uid: uuidv4() }))
      state.tickets = [...state.tickets, ...newBatch]
      state.stop = action.payload.stop
      state.loading = false
    },
    updateDisplayedTickets(state) {
      state.displayedTickets = state.tickets.slice(0, state.displayCount)
    },
    addFiveTickets(state) {
      state.displayCount += 5
      state.displayedTickets = state.tickets.slice(0, state.displayCount)
    },
    resetDisplayCount(state) {
      state.displayCount = 5
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    resetTickets(state) {
      state.searchId = ''
      state.tickets = []
      state.displayedTickets = []
      state.stop = false
      state.displayCount = 5
      state.loading = false
      state.error = null
    },
  },
})

export const {
  getSearchId,
  getTickets,
  updateDisplayedTickets,
  addFiveTickets,
  resetDisplayCount,
  setLoading,
  setError,
  resetTickets,
} = ticketsSlice.actions

export default ticketsSlice.reducer

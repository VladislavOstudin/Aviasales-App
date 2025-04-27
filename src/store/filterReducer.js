import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  all: false,
  selected: [],
  filtersApplied: false,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleAll(state) {
      if (state.all) {
        state.all = false
        state.selected = []
      } else {
        state.all = true
        state.selected = [0, 1, 2, 3]
      }
      state.filtersApplied = state.selected.length > 0
    },
    toggleTransfer(state, action) {
      const value = action.payload
      const index = state.selected.indexOf(value)

      if (index > -1) {
        state.selected.splice(index, 1)
      } else {
        state.selected.push(value)
      }

      state.all = state.selected.length === 4
      state.filtersApplied = state.selected.length > 0
    },
    setTransfers(state, action) {
      state.selected = action.payload
      state.all = action.payload.length === 4
      state.filtersApplied = action.payload.length > 0
    },
  },
})

export const { toggleAll, toggleTransfer, setTransfers } = filtersSlice.actions
export default filtersSlice.reducer

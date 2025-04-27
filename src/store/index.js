import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterReducer'
import tabsReducer from './tabsReducer'
import ticketsReducer from './ticketsReducer'

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    sort: tabsReducer,
    tickets: ticketsReducer,
  },
  devTools: false,
})

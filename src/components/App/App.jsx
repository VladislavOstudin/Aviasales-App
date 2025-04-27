import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchSession, fetchTickets } from '../../store/service/getTickets'
import Header from '../Header'
import SearchMethods from '../SearchMethods'
import TicketList from '../TicketsList'
import CheckboxesBlock from '../CheckboxesBlock'

import classes from './App.module.scss'

export default function App() {
  const dispatch = useDispatch()
  const searchId = useSelector((state) => state.tickets.searchId)
  const selectedFilters = useSelector((state) => state.filters.selected)

  useEffect(() => {
    dispatch(createSearchSession())
  }, [dispatch])

  useEffect(() => {
    if (searchId) {
      dispatch(fetchTickets())
    }
  }, [searchId, dispatch])

  useEffect(() => {
    if (selectedFilters.length > 0) {
      dispatch(createSearchSession())
    }
  }, [selectedFilters, dispatch])

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.main_container}>
        <CheckboxesBlock />
        <div className={classes.tickets_container}>
          <SearchMethods />
          <TicketList />
        </div>
      </div>
    </div>
  )
}

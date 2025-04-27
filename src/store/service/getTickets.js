import axios from 'axios'

import { getSearchId, getTickets, updateDisplayedTickets, setError, setLoading } from '../ticketsReducer'

const API_BASE_URL = 'https://aviasales-test-api.kata.academy'

export const createSearchSession = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`)
    dispatch(getSearchId(response.data.searchId))
  } catch (err) {
    dispatch(setError('Ошибка при создании сессии'))
  }
}

export const fetchTickets = () => async (dispatch, getState) => {
  const { tickets } = getState()
  const searchId = tickets.searchId
  if (!searchId) return

  dispatch(setLoading(true))
  try {
    const response = await axios.get(`${API_BASE_URL}/tickets?searchId=${searchId}`)
    dispatch(getTickets(response.data))
    dispatch(updateDisplayedTickets())

    if (!response.data.stop) {
      dispatch(fetchTickets())
    }
  } catch (err) {
    if (err.response.status === 500) {
      dispatch(fetchTickets())
    } else {
      dispatch(setError('Ошибка при загрузке билетов'))
    }
  } finally {
    dispatch(setLoading(false))
  }
}

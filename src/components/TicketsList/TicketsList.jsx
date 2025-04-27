import { useSelector } from 'react-redux'
import { Spin } from 'antd'
import Ticket from '../Ticket'
import ButtonShowMore from '../ButtonShowMore'
import { sortTickets } from '../../utils/sortTickets'

import classes from './TicketsList.module.scss'

export default function TicketList() {
  const { tickets, displayCount, stop } = useSelector((state) => state.tickets)
  const { selected, all } = useSelector((state) => state.filters)
  const sortMethod = useSelector((state) => state.sort)

  const filteredTickets = tickets.filter((ticket) => {
    if (all) return true
    const returnSegment = ticket.segments[1]
    return selected.includes(returnSegment.stops.length)
  })

  const sortedTickets = sortTickets(filteredTickets, sortMethod)

  const visibleTickets = sortedTickets.slice(0, displayCount)

  return (
    <div className={classes.ticket_list_container}>
      {visibleTickets.length ? (
        <>
          {!stop ? <Spin size="large" /> : null}

          {visibleTickets.map((ticket) => (
            <Ticket key={ticket.uid} ticket={ticket} />
          ))}
          {visibleTickets.length < filteredTickets.length && <ButtonShowMore />}
        </>
      ) : (
        <span className={classes.no_ticket}>Рейсов, подходящих под заданные фильтры, не найдено</span>
      )}
    </div>
  )
}

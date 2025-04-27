import PropTypes from 'prop-types'
import { format, add } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import classes from './Ticket.module.scss'

export default function Ticket({ ticket }) {
  const { price, segments } = ticket

  function getStopsText(count) {
    if (count === 0) return 'БЕЗ ПЕРЕСАДОК'
    if (count === 1) return '1 ПЕРЕСАДКА'
    return `${count} ПЕРЕСАДКИ`
  }

  function formatFlightTime(date, duration) {
    const departure = new Date(date)
    const arrival = add(departure, { minutes: duration })
    return (
      <span className={classes.ticket_item_value}>{`${format(departure, 'HH:mm')} - ${format(arrival, 'HH:mm')}`}</span>
    )
  }

  function ticketPrice(p) {
    const first = Math.floor(p / 1000)
    let second = p % 1000
    if (p % 1000 < 100) {
      second = `0${second}`
    }
    if (p % 1000 < 10) {
      second = `00${second}`
    }
    return `${first} ${second} Р`
  }

  return (
    <section className={classes.ticket_container}>
      <div className={classes.price_container}>
        <div className={classes.ticket_price}>{ticketPrice(price)}</div>
        <img src={`http://pics.avs.io/99/36/${ticket.carrier}.png`} alt="Logotipchik" />
      </div>

      {segments.map((segment) => (
        <div key={uuidv4()} className={classes.ticket}>
          <div className={classes.ticket_item}>
            <span className={classes.ticket_item_title}>
              {segment.origin} - {segment.destination}
            </span>
            {formatFlightTime(segment.date, segment.duration)}
          </div>
          <div className={classes.ticket_item}>
            <span className={classes.ticket_item_title}>В ПУТИ</span>
            <span className={classes.ticket_item_value}>
              {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
            </span>
          </div>
          <div className={classes.ticket_item}>
            <span className={classes.ticket_item_title}>{getStopsText(segment.stops.length)}</span>
            <span className={classes.ticket_item_value}>{segment.stops.join(', ')}</span>
          </div>
        </div>
      ))}
    </section>
  )
}

Ticket.propTypes = {
  ticket: PropTypes.object,
}

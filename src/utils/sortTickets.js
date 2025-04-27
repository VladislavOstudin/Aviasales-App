export function sortTickets(tickets, sortMethod) {
  switch (sortMethod) {
    case 'cheapest':
      return [...tickets].sort((a, b) => a.price - b.price)
    case 'fastest':
      return [...tickets].sort((a, b) => {
        const aDuration = a.segments[0].duration + a.segments[1].duration
        const bDuration = b.segments[0].duration + b.segments[1].duration
        return aDuration - bDuration
      })
    case 'optimal':
      return [...tickets].sort((a, b) => {
        const aDuration = a.segments[0].duration + a.segments[1].duration
        const bDuration = b.segments[0].duration + b.segments[1].duration
        const aScore = a.price + aDuration * 15
        const bScore = b.price + bDuration * 15
        return aScore - bScore
      })
    default:
      return tickets
  }
}

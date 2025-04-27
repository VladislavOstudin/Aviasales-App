import { useState } from 'react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { addFiveTickets } from '../../store/ticketsReducer'

const ButtonShowMore = () => {
  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useDispatch()

  return (
    <Button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => dispatch(addFiveTickets())}
      style={{
        marginBottom: '50px',
        background: '#2196F3',
        height: '50px',
        width: '100%',
        opacity: isHovered ? 0.63 : 1,
      }}
      type="primary"
    >
      ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
    </Button>
  )
}

export default ButtonShowMore

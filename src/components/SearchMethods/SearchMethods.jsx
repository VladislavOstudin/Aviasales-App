import { Radio } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setSort } from '../../store/tabsReducer'

import classes from './SearchMethods.module.scss'

const options = [
  {
    label: 'САМЫЙ ДЕШЕВЫЙ',
    value: 'cheapest',
  },
  {
    label: 'САМЫЙ БЫСТРЫЙ',
    value: 'fastest',
  },
  {
    label: 'ОПТИМАЛЬНЫЙ',
    value: 'optimal',
  },
]

export default function SearchMethods() {
  const dispatch = useDispatch()
  const sortMethod = useSelector((state) => state.sort)

  function handleChange(value) {
    dispatch(setSort(value))
  }

  return (
    <div className={classes.search_bar}>
      <Radio.Group
        className={classes.search_options}
        block
        options={options}
        value={sortMethod}
        onChange={(e) => handleChange(e.target.value)}
        optionType="button"
        buttonStyle="solid"
      />
    </div>
  )
}

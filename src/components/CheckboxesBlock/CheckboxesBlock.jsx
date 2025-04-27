import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAll, toggleTransfer } from '../../store/filterReducer'

import classes from './CheckboxesBlock.module.scss'

const transferOptions = [
  { label: 'Без пересадок', value: 0 },
  { label: '1 пересадка', value: 1 },
  { label: '2 пересадки', value: 2 },
  { label: '3 пересадки', value: 3 },
]

export default function CheckboxesBlock() {
  const dispatch = useDispatch()
  const filtersState = useSelector((state) => state.filters) || {}
  const { all = false, selected = [] } = filtersState

  const toggleValue = (value) => {
    dispatch(toggleTransfer(value))
  }

  const handleToggleAll = () => {
    dispatch(toggleAll())
  }

  return (
    <aside className={classes.checkboxes_container}>
      <span className={classes.checkboxes_title}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>

      <label className={`${classes.custom_checkbox} ${all ? classes.checked : ''}`} onClick={handleToggleAll}>
        <span className={classes.checkmark} />
        <span>Все</span>
      </label>

      <div className={classes.group_wrapper}>
        {transferOptions.map((option) => {
          const isChecked = selected.includes(option.value)
          return (
            <label
              key={option.value}
              className={`${classes.custom_checkbox} ${isChecked ? classes.checked : ''}`}
              onClick={() => toggleValue(option.value)}
            >
              <span className={classes.checkmark} />
              <span>{option.label}</span>
            </label>
          )
        })}
      </div>
    </aside>
  )
}

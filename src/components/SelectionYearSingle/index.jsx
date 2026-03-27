import React from 'react'
import { Icon, Grid } from 'semantic-ui-react'
import useSelectionStore from '../../store/useSelectionStore'
import './SelectionYearSingle.scss'

const SelectionYearSingle = ({ data, selection }) => {
  const selectionStore = useSelectionStore()
  const year = selection.selectionRange ? selection.selectionRange[1] : 'n/a'

  const moveBackward = () => {
    if (year > data.startYear) {
      const newValue = year - 1
      selectionStore.setYearRange([newValue, newValue])
    }
  }

  const moveForward = () => {
    if (year < data.endYear) {
      const newValue = year + 1
      selectionStore.setYearRange([newValue, newValue])
    }
  }

  if (!data.startYear) return null

  return (
    <div className="m-t-xl m-b-lg">
      <Grid centered>
        <Grid.Row verticalAlign="middle">
          {year > data.startYear ? (
            <Icon size="large" name="backward" onClick={moveBackward} style={{ cursor: 'pointer' }} />
          ) : (
            <span className="invisible-text">spacer</span>
          )}
          <span style={{ margin: '0 1rem' }}>
            <h4>{year}</h4>
          </span>
          {year < data.endYear ? (
            <Icon size="large" name="forward" onClick={moveForward} style={{ cursor: 'pointer' }} />
          ) : (
            <span className="invisible-text">spacer</span>
          )}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default SelectionYearSingle

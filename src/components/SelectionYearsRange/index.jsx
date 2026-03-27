import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import useSelectionStore from '../../store/useSelectionStore'

const SelectionYearsRange = ({ data, selection }) => {
  const selectionStore = useSelectionStore()

  const handleDragEnd = (values) => {
    selectionStore.setYearRange(values)
  }

  if (!data.startYear) return null

  return (
    <div className="m-t-lg m-b-lg">
      <Slider
        range
        min={data.startYear}
        max={data.endYear}
        defaultValue={selection.selectionRange || [data.startYear, data.endYear]}
        onAfterChange={handleDragEnd}
        marks={Object.fromEntries(
          Array.from({ length: data.endYear - data.startYear + 1 }, (_, i) => [
            data.startYear + i,
            (data.startYear + i).toString()
          ])
        )}
        step={1}
      />
    </div>
  )
}

export default SelectionYearsRange

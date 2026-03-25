import React from 'react'
import ChartsTabs from '../ChartsTabs'
import useDataStore from '../../store/useDataStore'
import useSelectionStore from '../../store/useSelectionStore'
import './ChartWrapper.scss'

const ChartWrapper = () => {
  const data = useDataStore()
  const selection = useSelectionStore()

  if (data.selectedStation) {
    return (
      <div id="chart-wrapper">
        <ChartsTabs data={data} selection={selection} />
      </div>
    )
  }
  return null
}

export default ChartWrapper

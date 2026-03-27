import React, { useState } from 'react'
import { Tab } from 'semantic-ui-react'
import ChartsLineChart from '../ChartsLineChart'
import ChartsBoxChartPerStation from '../ChartsBoxChartPerStation'
import ChartsBoxChartPerMonth from '../ChartsBoxChartPerMonth'
import useUiStore from '../../store/useUiStore'
import useSelectionStore from '../../store/useSelectionStore'
import './ChartsTabs.scss'

const ChartsTabs = ({ data, selection }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const ui = useUiStore()
  const selectionStore = useSelectionStore()

  const panes = [
    {
      menuItem: 'multi year line',
      render: () => (
        <Tab.Pane>
          <ChartsLineChart className="chart chart-spacer" selection={selection} data={data} />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'single year line',
      render: () => (
        <Tab.Pane>
          <ChartsLineChart className="chart chart-spacer" selection={selection} data={data} />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'box plot',
      render: () => (
        <Tab.Pane>
          <ChartsBoxChartPerStation className="chart chart-spacer" selection={selection} data={data} />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'box plot per month',
      render: () => (
        <Tab.Pane>
          <ChartsBoxChartPerMonth className="chart chart-spacer" selection={selection} data={data} />
        </Tab.Pane>
      )
    }
  ]

  const handleTabChange = (e, { activeIndex }) => {
    setActiveIndex(activeIndex)
    if (activeIndex === 0) {
      selectionStore.setSingleYearSelection(false)
      selectionStore.setChartType('LINE_MULTI')
      selectionStore.setYearRange([data.startYear, data.endYear])
      ui.setShowYearSelection(true)
    } else if (activeIndex === 1) {
      selectionStore.setSingleYearSelection(true)
      selectionStore.setChartType('LINE_SINGLE')
      selectionStore.setYearRange([data.endYear, data.endYear])
      ui.setShowYearSelection(true)
    } else if (activeIndex === 2) {
      selectionStore.setChartType('BOX')
      ui.setShowYearSelection(false)
    } else if (activeIndex === 3) {
      selectionStore.setChartType('BOX_MONTH')
      ui.setShowYearSelection(false)
    }
  }

  return (
    <div id="chart-tabs">
      {selection.activeParam && (
        <Tab panes={panes} activeIndex={activeIndex} onTabChange={handleTabChange} />
      )}
    </div>
  )
}

export default ChartsTabs

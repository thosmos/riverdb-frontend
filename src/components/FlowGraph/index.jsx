import React, { useMemo } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { graphConfig } from '../../assets/chart/graphConfig'
import { subHours } from 'date-fns'

const FlowGraph = ({ station, data }) => {
  const validData = useMemo(() => {
    return data?.some(d => d.value > 0)
  }, [data])

  const plotData = useMemo(() => {
    if (data && data.length > 0) {
      const graphData = data.map(d => {
        const date = subHours(new Date(d.date), 8)
        const utc = Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          date.getUTCHours(),
          date.getUTCMinutes(),
          date.getUTCSeconds()
        )
        return [utc, d.value]
      })
      return [{
        name: 'Flow in cubic feet per second',
        data: graphData,
        type: 'spline'
      }]
    }
    return []
  }, [data])

  const chartOptions = useMemo(() => {
    return {
      chart: {
        type: 'spline',
        zoomType: 'xy'
      },
      ...graphConfig,
      exporting: {
        filename: `${station.name} flow graph`
      },
      title: {
        text: station.name
      },
      xAxis: [{
        type: 'datetime',
        title: {
          text: 'Date'
        }
      }],
      yAxis: [{
        title: {
          text: 'CFS'
        }
      }],
      tooltip: {
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: false,
            radius: 2.5,
            symbol: 'circle'
          },
          lineWidth: 1.5
        },
        series: {
          animation: false
        }
      },
      rangeSelector: {
        selected: 1,
        enabled: false
      },
      series: plotData
    }
  }, [station, plotData])

  if (!data) return null

  return (
    <div>
      {validData ? (
        <>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={chartOptions}
          />
          <br />
        </>
      ) : (
        <div className="ui segment">
          <h5>No valid data for {station.name}</h5>
        </div>
      )}
      <br />
    </div>
  )
}

export default FlowGraph

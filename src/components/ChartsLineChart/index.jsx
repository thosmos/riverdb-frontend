import React, { useMemo } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { palette1 } from '../../assets/chart/palettes'
import { multiStation, graphConfig } from '../../assets/chart/graphConfig'
import {
  getUnit,
  getParamInfoLine,
  getFullParamName,
  getMinMaxValue
} from '../../utils/charts'
import cloneDeep from 'lodash/cloneDeep'

const ChartsLineChart = ({ selection, data }) => {
  const getYearRange = useMemo(() => {
    const range = selection.selectionRange
    if (!range) return ''
    return range[0] === range[1]
      ? range[0]
      : `from ${range[0]} to ${range[1]}`
  }, [selection.selectionRange])

  const plotData = useMemo(() => {
    if (data.loadedStations && selection.selectionRange) {
      let plotData = []
      data.loadedStations.forEach(s => {
        let temp = s
          .setYearRange({
            startYear: selection.selectionRange[0],
            endYear: selection.selectionRange[1]
          })
          .setParam(selection.activeParam)
          .roundTo(1)
          .bufferData(
            selection.selectionRange[0],
            selection.selectionRange[1]
          )
          .linePlot()

        plotData.push({
          name: selection.secondaryParam
            ? selection.activeParam
            : s.info.StationName,
          type: 'spline',
          data: temp.processed.data
        })

        if (selection.secondaryParam) {
          let sec = cloneDeep(s)
          let tempSec = sec
            .setYearRange({
              startYear: selection.selectionRange[0],
              endYear: selection.selectionRange[1]
            })
            .setParam(selection.secondaryParam)
            .roundTo(1)
            .bufferData(
              selection.selectionRange[0],
              selection.selectionRange[1]
            )
            .linePlot()

          plotData.push({
            name: selection.secondaryParam,
            data: tempSec.processed.data,
            type: 'spline',
            yAxis: 1
          })
        }
      })
      return plotData
    }
    return []
  }, [data.loadedStations, selection.selectionRange, selection.activeParam, selection.secondaryParam])

  const chartOptions = useMemo(() => {
    const minMax = getMinMaxValue(plotData)
    const options = {
      chart: {
        type: 'spline',
        zoomType: 'xy'
      },
      ...graphConfig,
      ...multiStation(data.loadedStations, selection.activeParam),
      xAxis: [
        {
          type: 'datetime',
          title: {
            text: 'Date'
          }
        }
      ],
      yAxis: [
        {
          title: {
            text: getFullParamName(selection.activeParam) + getUnit(selection.activeParam)
          },
          plotLines: getParamInfoLine(selection.activeParam),
          min: minMax[0],
          max: minMax[1]
        },
        selection.secondaryParam ? {
          title: {
            text: getFullParamName(selection.secondaryParam) + getUnit(selection.secondaryParam)
          },
          opposite: true
        } : {
          title: { text: '' },
          opposite: true
        }
      ],
      tooltip: {
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: true,
            radius: 2.5,
            symbol: 'circle'
          },
          lineWidth: 1.5
        },
        series: {
          animation: false
        }
      },
      colors: palette1,
      series: plotData,
      exporting: {
        filename: `line chart ${selection.activeParam} ${getYearRange}`
      }
    }
    return options
  }, [plotData, data.loadedStations, selection.activeParam, selection.secondaryParam, getYearRange])

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  )
}

export default ChartsLineChart

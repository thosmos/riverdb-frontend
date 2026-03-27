import React, { useMemo } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'
import { palette1 } from '../../assets/chart/palettes'
import { multiStation, graphConfig } from '../../assets/chart/graphConfig'
import {
  getUnit,
  getParamInfoLine,
  getFullParamName,
  getMinMaxValue
} from '../../utils/charts'

if (typeof Highcharts === 'object') {
  HighchartsMore(Highcharts)
}

const ChartsBoxChartPerStation = ({ selection, data }) => {
  const plotData = useMemo(() => {
    if (data.loadedStations && data.startYear) {
      let plotData = []
      data.loadedStations.forEach(s => {
        let temp = s
          .setYearRange({
            startYear: data.startYear,
            endYear: data.endYear
          })
          .setParam(selection.activeParam)
          .roundTo(1)
          .bufferData(data.startYear, data.endYear)
          .boxPlot()

        plotData.push({
          name: s.info.StationName,
          data: [temp.processed.data]
        })
      })
      return plotData
    }
    return []
  }, [data.loadedStations, data.startYear, data.endYear, selection.activeParam])

  const chartOptions = useMemo(() => {
    const minMax = getMinMaxValue(plotData)
    const options = {
      chart: {
        type: 'boxplot'
      },
      ...graphConfig,
      ...multiStation(data.loadedStations, selection.activeParam),
      xAxis: {
        labels: { enabled: false }
      },
      yAxis: {
        title: {
          text: getFullParamName(selection.activeParam) + getUnit(selection.activeParam)
        },
        plotLines: getParamInfoLine(selection.activeParam),
        min: minMax[0],
        max: minMax[1]
      },
      plotOptions: {
        series: {
          animation: false
        }
      },
      colors: palette1,
      series: plotData,
      exporting: {
        filename: `box plot per station ${selection.activeParam}`
      }
    }
    return options
  }, [plotData, data.loadedStations, selection.activeParam])

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  )
}

export default ChartsBoxChartPerStation

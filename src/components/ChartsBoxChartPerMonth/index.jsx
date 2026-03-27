import React, { useMemo } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'
import { singleStation, monthsOnXAxis } from '../../assets/chart/graphConfig'
import {
  getUnit,
  getParamInfoLine,
  getFullParamName,
  getMinMaxValue
} from '../../utils/charts'
import get from 'lodash/get'

if (typeof Highcharts === 'object') {
  HighchartsMore(Highcharts)
}

const ChartsBoxChartPerMonth = ({ selection, data }) => {
  const plotData = useMemo(() => {
    if (data.selectedStation && data.startYear) {
      let temp = data.selectedStation
        .setYearRange({
          startYear: data.startYear,
          endYear: data.endYear
        })
        .setParam(selection.activeParam)
        .roundTo(1)
        .bufferData(data.startYear, data.endYear)
        .boxPlotPerMonth()

      return [
        {
          name: get(data, 'selectedStation.info.StationName', 'aaaa'),
          data: temp.processed.data
        }
      ]
    }
    return []
  }, [data.selectedStation, data.startYear, data.endYear, selection.activeParam])

  const chartOptions = useMemo(() => {
    const minMax = getMinMaxValue(plotData)
    const options = {
      chart: {
        type: 'boxplot'
      },
      ...singleStation(
        get(data, 'selectedStation.info.StationName', 'xxxxx'),
        selection.activeParam
      ),
      ...monthsOnXAxis,
      yAxis: {
        title: {
          text: getFullParamName(selection.activeParam) + getUnit(selection.activeParam)
        },
        plotLines: getParamInfoLine(selection.activeParam),
        min: minMax[0],
        max: minMax[1]
      },
      exporting: {
        filename: `${get(plotData, '[0].name', 'chart')} monthly box plot ${selection.activeParam}`
      },
      series: plotData
    }
    return options
  }, [plotData, data.selectedStation, selection.activeParam])

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  )
}

export default ChartsBoxChartPerMonth

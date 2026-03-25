import React, { useMemo } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { palette1 } from '../../assets/chart/palettes'
import {
  getSafetoSwimChartValues,
  getSafetoSwimChartGeomeans,
} from '../../utils/charts'

const ChartsSafeSwim = ({ swimstation }) => {
  const chartOptions = useMemo(() => {
    if (!swimstation) return {}

    return {
      chart: {
        type: 'line',
        zoomType: 'x',
      },
      title: {
        text: `ecoli MPN/100mL at ${swimstation.StationName}, ${swimstation.Agency?.AgencyCode}`,
      },
      xAxis: [
        {
          type: 'datetime',
          title: {
            text: 'Date',
          },
        },
      ],
      yAxis: [
        {
          title: {
            text: 'ecoli MPN/100mL',
          },
          type: 'logarithmic',
          plotLines: [
            {
              value: 320,
              color: palette1[0],
              width: 2,
              label: {
                align: 'left',
                style: { color: palette1[0] },
                text: 'Statistical Threshold Value (STV): 320 MPN/100 mL',
              },
            },
            {
              value: 100,
              color: palette1[1],
              width: 2,
              label: {
                align: 'left',
                style: { color: palette1[1] },
                text: 'Geometric Mean Threshold: 100 MPN/100 mL',
              },
            },
          ],
          max: 420,
        },
      ],
      tooltip: {
        shared: true,
      },
      plotOptions: {
        line: {
          marker: {
            enabled: true,
            radius: 2.5,
            symbol: 'circle',
          },
          lineWidth: 0,
          states: {
            hover: {
              lineWidthPlus: 0,
            },
          },
        },
        series: {
          animation: false,
        },
      },
      colors: palette1,
      series: [
        {
          name: 'sample',
          type: 'line',
          data: getSafetoSwimChartValues(swimstation.values || []),
        },
        {
          name: 'geomean',
          type: 'line',
          data: getSafetoSwimChartGeomeans(swimstation.values || []),
        },
      ],
      exporting: {
        filename: 'chart ecoli',
      },
    }
  }, [swimstation])

  return (
    <div id="container">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  )
}

export default ChartsSafeSwim

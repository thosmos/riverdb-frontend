import React, { useMemo } from 'react'
import { Segment, Header } from 'semantic-ui-react'
import uniq from 'lodash/uniq'
import remove from 'lodash/remove'
import useDataStore from '../../store/useDataStore'
import useSelectionStore from '../../store/useSelectionStore'
import './DataTable.scss'

const DataTable = () => {
  const data = useDataStore()
  const selection = useSelectionStore()

  const columns = useMemo(() => {
    let temp = data.selectedStation?.meta?.params || []
    temp = uniq(temp)
    if (!temp.includes('date')) {
      temp.unshift('date')
    }
    remove(temp, (o) => o === 'null_null')
    const obsRegex = /FieldObs_/
    temp = temp.filter((t) => !obsRegex.test(t))
    const fieldRegex = /field_/
    temp = temp.filter((t) => !fieldRegex.test(t))
    return temp
  }, [data.selectedStation])

  const tableData = useMemo(() => {
    const station = data.selectedStation
    const rawData = station?.data || []
    const start = selection.selectionRange?.[0]
    const end = selection.selectionRange?.[1]

    const processedData = rawData.map((d) => {
      let fields = { date: d.date }
      Object.keys(d.results).forEach((k) => {
        fields[k] = d.results[k].mean
      })
      return fields
    })

    if (start && end) {
      return processedData.filter((d) => {
        const year = new Date(d.date).getFullYear()
        return year >= start && year <= end
      })
    }
    return processedData
  }, [data.selectedStation, selection.selectionRange])

  if (!data.selectedStation) return null

  return (
    <div id="table">
      <Segment>
        <Header as="h3" textAlign="center" id="step-9">
          {data.selectedStation.info.StationName}
        </Header>
        <div className="table-container">
          <table className="ui celled table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.slice(0, 25).map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {tableData.length > 25 && <p>Showing first 25 rows...</p>}
        </div>
      </Segment>
    </div>
  )
}

export default DataTable

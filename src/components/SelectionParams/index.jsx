import React, { useMemo, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import useSelectionStore from '../../store/useSelectionStore'
import useDataStore from '../../store/useDataStore'
import names from '../../assets/parameterNames'
import uniq from 'lodash/uniq'
import flatten from 'lodash/flatten'
import './SelectionParams.scss'

const SelectionParams = () => {
  const selectionStore = useSelectionStore()
  const dataStore = useDataStore()

  const allParams = useMemo(() => {
    let temp = dataStore.loadedStations.map(s => s.meta.params)
    temp = uniq(flatten(temp))
    const nullRegex = /null/
    const dateRegex = /date/
    const obsRegex = /FieldObs_/
    const fieldRegex = /field_/

    temp = temp.filter(t =>
      !nullRegex.test(t) &&
      !dateRegex.test(t) &&
      !obsRegex.test(t) &&
      !fieldRegex.test(t)
    )
    return temp.sort()
  }, [dataStore.loadedStations])

  useEffect(() => {
    if (!selectionStore.activeParam && allParams.length > 0) {
      const defaultParam = allParams.includes('H2O_Temp') ? 'H2O_Temp' : allParams[0]
      selectionStore.setActiveParam(defaultParam)
    }
  }, [allParams, selectionStore])

  const allSecondaryParams = useMemo(() => {
    return allParams.filter(p => p !== selectionStore.activeParam)
  }, [allParams, selectionStore.activeParam])

  const parameterName = (p) => names[p]?.text || p.replace('H2O_', '')

  const canHaveSecondaryParam = () => {
    if (selectionStore.chartType === 'LINE_MULTI' || selectionStore.chartType === 'LINE_SINGLE') {
      if (dataStore.loadedStations.length === 1 && allParams.length > 1) {
        return true
      }
    }
    return false
  }

  const selectParam = (param) => {
    dataStore.generateKey()
    selectionStore.setActiveParam(param)
  }

  const selectSecondaryParam = (param) => {
    if (param === selectionStore.secondaryParam) {
      selectionStore.setSecondaryParam(null)
    } else {
      selectionStore.setSecondaryParam(param)
    }
  }

  return (
    <div id="selection-params">
      <small>
        <b>{canHaveSecondaryParam() ? 'Primary Parameter: ' : 'Parameter: '}</b>
      </small>
      <br />
      <div className="flex-row">
        {allParams.map(p => (
          <div key={p}>
            <Button
              onClick={() => selectParam(p)}
              active={p === selectionStore.activeParam}
              fluid
            >
              {parameterName(p)}
            </Button>
          </div>
        ))}
      </div>
      {canHaveSecondaryParam() && (
        <div className="m-t-md">
          <small><b>Secondary Parameter: </b></small>
          <br />
          <div className="flex-row secondary-param-row">
            {allSecondaryParams.map(p2 => (
              <div key={p2}>
                <Button
                  onClick={() => selectSecondaryParam(p2)}
                  active={p2 === selectionStore.secondaryParam}
                  fluid
                  size="small"
                >
                  {parameterName(p2)}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectionParams

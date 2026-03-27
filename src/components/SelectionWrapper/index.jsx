import React, { useMemo } from 'react'
import { Message, Grid } from 'semantic-ui-react'
import Select from 'react-select'
import SelectionStationMap from '../SelectionStationMap'
import SelectionStations from '../SelectionStations'
import SelectionYearsRange from '../SelectionYearsRange'
import SelectionYearSingle from '../SelectionYearSingle'
import SelectionParams from '../SelectionParams'
import Loader from '../Loader'
import useUiStore from '../../store/useUiStore'
import useDataStore from '../../store/useDataStore'
import useSelectionStore from '../../store/useSelectionStore'
import { calculateStationsForSelection, calcStationOption } from '../../utils/selectionUtils'
import sortBy from 'lodash/sortBy'
import './SelectionWrapper.scss'

const SelectionWrapper = ({ stations, safeOptions, projects }) => {
  const ui = useUiStore()
  const data = useDataStore()
  const selection = useSelectionStore()

  const stationOptions = useMemo(() => calculateStationsForSelection(stations), [stations])
  const sortedStationOptions = useMemo(() => sortBy(stationOptions, (o) => o.label), [stationOptions])

  const selectedProjectOption = projects?.find(p => p.ProjectID === data.activeProject?.ProjectID) || null

  const currentSelectedStationOption = useMemo(() => {
    if (data.selectedStation && data.selectedStation.info && data.selectedStation.info.id) {
      return calcStationOption(data.selectedStation.info)
    }
    return null
  }, [data.selectedStation])

  const handleProjectChange = (option) => {
    data.setActiveProject(option)
    selection.setProject(option)
    data.selectStation(null)
    data.resetStations()
    selection.clearParam()
  }

  const handleStationChange = (option) => {
    if (option) {
      console.log('Fetch station data', option.value)
    }
  }

  return (
    <div id="selection-wrapper">
      {ui.errorMsg.selection && (
        <Message color="red">
          <p>{ui.errorMsg.selection}</p>
        </Message>
      )}
      <Grid id="step-3">
        <Grid.Column>
          {stationOptions && (
            <SelectionStationMap stations={stationOptions} safeOptions={safeOptions} />
          )}
        </Grid.Column>
      </Grid>

      {!safeOptions && (
        <>
          <Grid centered columns={2} className={ui.showInfoModal ? 'hide-multiselect' : ''} id="selection-boxes">
            <Grid.Column id="step-0">
              <Select
                options={projects}
                getOptionLabel={(o) => o.Name}
                getOptionValue={(o) => o.ProjectID}
                value={selectedProjectOption}
                onChange={handleProjectChange}
                placeholder="Select a Project"
              />
            </Grid.Column>
            <Grid.Column id="step-2">
              <Select
                options={sortedStationOptions}
                value={currentSelectedStationOption}
                onChange={handleStationChange}
                placeholder="Select a Station"
              />
            </Grid.Column>
          </Grid>

          {ui.isLoading && <Loader />}

          <div id="step-4" className="m-b-lg">
            <SelectionStations loadedStations={data.loadedStations} selectedStation={data.selectedStation} />
          </div>

          {ui.showYearSelection && (
            <div id="step-6">
              {!selection.singleYearSelection ? (
                selection.selectionRange && <SelectionYearsRange data={data} selection={selection} />
              ) : (
                <SelectionYearSingle data={data} selection={selection} />
              )}
            </div>
          )}

          {data.loadedStations.length > 0 && (
            <div id="step-5">
              <SelectionParams />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default SelectionWrapper

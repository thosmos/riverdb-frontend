import React from 'react'
import { Icon, Segment, Grid } from 'semantic-ui-react'
import useDataStore from '../../store/useDataStore'
import './SelectionStations.scss'

const SelectionStations = ({ loadedStations, selectedStation }) => {
  const dataStore = useDataStore()

  const onCloseClick = (station, event) => {
    event.stopPropagation()
    dataStore.removeStation(station.id)
  }

  const onSegmentClick = (station) => {
    dataStore.selectStation(station.id)
  }

  if (!selectedStation) return null

  return (
    <div id="selection-stations">
      <Grid stackable centered>
        {loadedStations.map((station) => (
          <Grid.Column key={station.info.StationID} width={4}>
            <div className="m-t-md">
              <Segment
                onClick={() => onSegmentClick(station.info)}
                className={station.info.id === selectedStation.info.id ? 'active' : ''}
              >
                <span>{station.info.StationName}</span>
                <Icon
                  className="space-left"
                  name="cancel"
                  onClick={(e) => onCloseClick(station.info, e)}
                />
              </Segment>
            </div>
          </Grid.Column>
        ))}
      </Grid>
    </div>
  )
}

export default SelectionStations

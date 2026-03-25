import React from 'react'
import { MapContainer, TileLayer, LayersControl, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Button } from 'semantic-ui-react'
import { format, subDays } from 'date-fns'
import { calculateBoundsOfStations } from '../../utils/geo'
import { tileProviders } from '../../assets/tileProviders'
import useDataStore from '../../store/useDataStore'
import useUiStore from '../../store/useUiStore'
import findIndex from 'lodash/findIndex'
import './SelectionStationMap.scss'

const genIcon = (color) => {
  return L.divIcon({
    className: '',
    html: `<div class='div-icon ${color}'/>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  })
}

const SelectionStationMap = ({ stations, safeOptions }) => {
  const loadedStations = useDataStore((state) => state.loadedStations)
  const toggleStationInfoModal = useUiStore((state) => state.toggleStationInfoModal)
  const toggleSafetoswimModal = useUiStore((state) => state.toggleSafetoswimModal)

  // These would be dispatch actions in Vuex, here they should be available from a hook or store
  // For now I'll stub them or expect them to be in the store
  const removeStation = useDataStore((state) => state.removeStation)
  // fetchStationData should probably be in a hook or store too
  const addStation = (station) => {
      // implementation here or from store
      console.log('Add station', station)
  }

  const cleanedStations = stations.filter((s) => s.value.TargetLat && s.value.TargetLong)
  const bounds = calculateBoundsOfStations(stations)

  const getIcon = (id, safeValue) => {
    const index = findIndex(loadedStations, (o) => o.info.id === id)
    if (index !== -1) {
      return genIcon('icon-loaded')
    } else {
      if (safeValue) {
        let safety = 'over365'
        if (
          safeValue.isHigh ||
          (safeValue.avg && safeValue.avg > 100) ||
          (safeValue.value && safeValue.value > 320)
        ) {
          const dt = new Date(Number(safeValue.date))
          const now = new Date()
          const days365 = subDays(now, 365)
          if (dt > days365) safety = 'unsafe'
        } else if (safeValue.date) {
          const dt = new Date(Number(safeValue.date))
          const now = new Date()
          if (dt > subDays(now, 7)) safety = 'under7'
          else if (dt > subDays(now, 14)) safety = 'under14'
          else if (dt > subDays(now, 30)) safety = 'under30'
          else if (dt > subDays(now, 365)) safety = 'under365'
        }
        return genIcon(safety)
      } else return genIcon('icon-normal')
    }
  }

  if (!bounds || bounds.length === 0) return null

  return (
    <div id="selection-map">
      {safeOptions && (
        <div id="safetoswim-legend">
          <div className="div-icon unsafe" /> Recently Unsafe <br />
          Last measured safe: <br />
          <div className="div-icon under7" /> within 7 days <br />
          <div className="div-icon under14" /> within 14 days <br />
          <div className="div-icon under30" /> within 30 days <br />
          <div className="div-icon under365" /> within 1 year <br />
          <div className="div-icon over365" /> over 1 year ago<br />
        </div>
      )}
      <MapContainer bounds={bounds} className="map-height">
        <LayersControl position="topright">
          {tileProviders.map((tp) => (
            <LayersControl.BaseLayer key={tp.name} name={tp.name} checked={tp.visible}>
              <TileLayer url={tp.url} attribution={tp.attribution} />
            </LayersControl.BaseLayer>
          ))}
        </LayersControl>
        {cleanedStations.map((marker) => (
          <Marker
            key={marker.value.id}
            position={[marker.value.TargetLat, marker.value.TargetLong]}
            icon={getIcon(marker.value.id, marker.value.latest)}
            opacity={marker.value.Active ? 1 : 0.5}
          >
            <Popup className="popup">
              <h6><b>{marker.value.StationName}</b></h6>
              {marker.value.LocalWaterbody && <p>on {marker.value.LocalWaterbody}</p>}
              {safeOptions && (
                <>
                  <p>Agency: {marker.value.Agency?.AgencyCode}</p>
                  <p>Latest: {format(new Date(Number(marker.value.latest.date)), 'M/d/yyyy')}</p>
                  <p>Value: {marker.value.latest.value} MPN/100mL</p>
                  <Button color="blue" basic fluid onClick={() => toggleSafetoswimModal(marker.value)}>
                    Historical Chart
                  </Button>
                </>
              )}
              {!safeOptions && (
                <>
                  <Button color="blue" basic fluid onClick={() => toggleStationInfoModal(marker.value)}>
                    Station Info
                  </Button>
                  {findIndex(loadedStations, (o) => o.info.id === marker.value.id) !== -1 ? (
                    <Button color="red" fluid onClick={() => removeStation(marker.value.id)}>
                      Remove Station
                    </Button>
                  ) : (
                    <Button color="blue" fluid onClick={() => addStation(marker.value)}>
                      Add Station
                    </Button>
                  )}
                </>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default SelectionStationMap

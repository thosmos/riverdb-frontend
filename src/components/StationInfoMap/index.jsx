import React, { useMemo } from 'react'
import { MapContainer, TileLayer, LayersControl, GeoJSON, Marker } from 'react-leaflet'
import L from 'leaflet'
import { tileProviders } from '../../assets/tileProviders'
import { tribStyleWithName, tribStyleWithoutName } from '../../assets/constants'
import markerIcon from '../../assets/GIS/map-marker-2-64.png'
import './StationInfoMap.scss'

const StationInfoMap = ({ watershed, station }) => {
  const icon = useMemo(() => L.icon({
    iconUrl: markerIcon,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -20]
  }), [])

  const bounds = useMemo(() => {
    if (watershed?.catchmentInfo?.shape?.coordinates?.[0]) {
      const coords = watershed.catchmentInfo.shape.coordinates[0]
      const lats = coords.map(c => c[1])
      const lngs = coords.map(c => c[0])
      return [[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]]
    }
    return [[39.1, -121.6], [39.7, -120.4]]
  }, [watershed])

  const upstreamOptions = {
    onEachFeature: (feature, layer) => {
      const name = feature.geometry.properties.name || `comid: ${feature.geometry.properties.comid}`
      layer.bindTooltip(name, { sticky: true })
    },
    style: (feature) => feature.geometry.properties.name ? tribStyleWithName : tribStyleWithoutName
  }

  return (
    <div id="station-info-map-container">
      <MapContainer bounds={bounds} id="map" className="map-height">
        <LayersControl position="topright">
          {tileProviders.map((tp) => (
            <LayersControl.BaseLayer key={tp.name} name={tp.name} checked={tp.visible}>
              <TileLayer url={tp.url} attribution={tp.attribution} />
            </LayersControl.BaseLayer>
          ))}
        </LayersControl>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {watershed && (
          <>
            <GeoJSON data={watershed.catchmentInfo.shape} />
            {watershed.upstreamInfo.paths.map((ut, i) => (
              <GeoJSON key={`up-${i}`} data={ut.shape} {...upstreamOptions} />
            ))}
            {watershed.downstreamInfo.paths.map((dt, i) => (
              <GeoJSON key={`down-${i}`} data={dt.shape} />
            ))}
            <Marker
              icon={icon}
              position={[station.TargetLat, station.TargetLong]}
              title={`${station.StationName} monitoring station`}
            />
          </>
        )}
      </MapContainer>
    </div>
  )
}

export default StationInfoMap

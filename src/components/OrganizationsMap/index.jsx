import React from 'react'
import { MapContainer, TileLayer, LayersControl, GeoJSON } from 'react-leaflet'
import { yuba, deer, wolf } from '../../assets/GIS/watersheds'
import agencyAreas from '../../assets/GIS/agencyAreas'
import OrganizationMapColorIndex from '../OrganizationMapColorIndex'
import { tileProviders } from '../../assets/tileProviders'
import './OrganizationsMap.scss'

const OrganizationsMap = () => {
  const organizations = [
    { name: 'SYRCL', river: 'Yuba', outline: yuba, options: agencyAreas[0] },
    { name: 'SSI', river: 'Deer', outline: deer, options: agencyAreas[2] },
    { name: 'WCCA', river: 'Wolf', outline: wolf, options: agencyAreas[1] },
  ]

  const bounds = [
    [39.1, -121.6],
    [39.7, -120.4],
  ]

  return (
    <div className="m-t-md m-b-lg">
      <MapContainer bounds={bounds} className="map-height" scrollWheelZoom={false}>
        <LayersControl position="topright">
          {tileProviders.map((tp) => (
            <LayersControl.BaseLayer key={tp.name} name={tp.name} checked={tp.visible}>
              <TileLayer url={tp.url} attribution={tp.attribution} />
            </LayersControl.BaseLayer>
          ))}
        </LayersControl>
        {organizations.map((org) => (
          <GeoJSON key={org.river} data={org.outline} style={org.options} />
        ))}
      </MapContainer>
      <OrganizationMapColorIndex organizations={organizations} />
    </div>
  )
}

export default OrganizationsMap

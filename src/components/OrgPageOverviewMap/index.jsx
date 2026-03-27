import React, { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, LayersControl, GeoJSON } from 'react-leaflet'
import { useParams } from 'react-router-dom'
import useOrganizationStore from '../../store/useOrganizationStore'
import { tileProviders } from '../../assets/tileProviders'
import { tribStyleWithName, tribStyleWithoutName } from '../../assets/constants'
import './OrgPageOverviewMap.scss'

const OrgPageOverviewMap = () => {
  const { org } = useParams()
  const organizationStore = useOrganizationStore()
  const ws = organizationStore.watershed

  useEffect(() => {
    if (org) {
      organizationStore.fetchOrganizationWatershed(org)
    }
  }, [org])

  const bounds = useMemo(() => {
    if (ws?.catchmentInfo?.shape?.coordinates?.[0]) {
      const coords = ws.catchmentInfo.shape.coordinates[0]
      const lats = coords.map(c => c[1])
      const lngs = coords.map(c => c[0])
      return [[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]]
    }
    return null
  }, [ws])

  const upstreamOptions = {
    onEachFeature: (feature, layer) => {
      const name = feature.geometry.properties.name || `comid: ${feature.geometry.properties.comid}`
      layer.bindTooltip(name, { sticky: true })
    },
    style: (feature) => feature.geometry.properties.name ? tribStyleWithName : tribStyleWithoutName
  }

  if (!bounds) return <div id="map-skeleton" className="map-height">Loading Watershed...</div>

  return (
    <div className="m-t-md m-b-md">
      <MapContainer bounds={bounds} id="map" className="map-height" scrollWheelZoom={false}>
        <LayersControl position="topright">
          {tileProviders.map((tp) => (
            <LayersControl.BaseLayer key={tp.name} name={tp.name} checked={tp.visible}>
              <TileLayer url={tp.url} attribution={tp.attribution} />
            </LayersControl.BaseLayer>
          ))}
        </LayersControl>
        <GeoJSON data={ws.catchmentInfo.shape} />
        {ws.upstreamInfo.paths.map((ut, i) => (
          <GeoJSON key={`up-${i}`} data={ut.shape} {...upstreamOptions} />
        ))}
      </MapContainer>
      <div className="wsm-info">
        <p id="inside-map">
          For a more interactive view of the whole watershed go to{' '}
          <a href={`https://watershedmap.org/${org}`} target="_blank" rel="noopener noreferrer">
            watershedmap.org
          </a>
        </p>
      </div>
    </div>
  )
}

export default OrgPageOverviewMap

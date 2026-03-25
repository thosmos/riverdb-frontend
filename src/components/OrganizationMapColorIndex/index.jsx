import React from 'react'
import './OrganizationMapColorIndex.scss'

const OrganizationMapColorIndex = ({ organizations }) => {
  return (
    <div id="org-map-color-index">
      {organizations.map((org) => (
        <div key={org.river}>
          <span
            className="info-box"
            style={{
              background: org.options.fillColor,
              opacity: org.options.fillOpacity * 2,
            }}
          >
            {org.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default OrganizationMapColorIndex

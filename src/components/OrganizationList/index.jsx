import React from 'react'
import organizations from '../../assets/organizations'
import OrganizationCard from '../OrganizationCard'

const OrganizationList = () => {
  return (
    <div className="ui centered grid stackable">
      {organizations.map((org) => (
        <div key={org.abbreviation} className="four wide computer six wide tablet column">
          <OrganizationCard org={org} />
        </div>
      ))}
    </div>
  )
}

export default OrganizationList

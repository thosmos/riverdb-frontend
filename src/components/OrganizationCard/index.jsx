import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './OrganizationCard.scss'

const OrganizationCard = ({ org }) => {
  return (
    <Card className="fluid organization-card eq-card">
      <Card.Content className="card-abbr">
        <Link to={`/org/${org.abbreviation}`}>
          <h3>{org.abbreviation}</h3>
        </Link>
      </Card.Content>

      <div className="img-wrapper">
        <Image src={org.logoURL} />
      </div>

      <Card.Content>
        <h3>{org.name}</h3>
        <p>{org.missionStatement}</p>
      </Card.Content>

      <div className="spacer">
        <Link to={`/data/${org.abbreviation}`}>
          <Button fluid size="big" primary>
            View Data
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export default OrganizationCard

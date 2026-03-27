import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import './OrgPageIntro.scss'

const OrgPageIntro = ({ info }) => {
  return (
    <div id="org-page-intro">
      <Card.Content className="card-header">
        <h2 className="ui center aligned icon header">{info.Name}</h2>
      </Card.Content>
      <div className="spacer">
        <Image src={info.Logo} size="small" floated="left" />
        <p>{info.AgencyDescr}</p>
      </div>
    </div>
  )
}

export default OrgPageIntro

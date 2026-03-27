import React from 'react'
import { Header, Grid, Icon } from 'semantic-ui-react'
import './OrgPageContact.scss'

const OrgPageContact = ({ info }) => {
  return (
    <div id="org-page-contact">
      <Header as="h3" textAlign="center">Contact:</Header>
      <Grid columns={2} stackable>
        <Grid.Column>
          <p>
            <b>
              <Icon name="user" /> {info.PrimaryContact}
            </b>
          </p>
        </Grid.Column>
        <Grid.Column>
          <p>
            <b>
              <Icon name="phone" /> {info.Telephone}
            </b>
          </p>
        </Grid.Column>
        <Grid.Column>
          <Icon name="envelope" />
          <b>
            <a href={`mailto:${info.Email}`}>{info.Email}</a>
          </b>
        </Grid.Column>
        <Grid.Column>
          <p>
            <b>
              <Icon name="home" />
              <a href={info.WebAddress} target="_blank" rel="noopener noreferrer">
                {info.WebAddress}
              </a>
            </b>
          </p>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default OrgPageContact

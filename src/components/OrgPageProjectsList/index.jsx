import React from 'react'
import { Header, Grid } from 'semantic-ui-react'
import OrgPageProjectInfo from '../OrgPageProjectInfo'
import './OrgPageProjectsList.scss'

const OrgPageProjectsList = ({ info }) => {
  return (
    <div id="org-page-projects-list">
      <Header as="h3" textAlign="center">Projects:</Header>
      <Grid stackable centered>
        {info.Projects && info.Projects.map((project) => (
          <Grid.Column key={project.ProjectID} computer={8}>
            <OrgPageProjectInfo project={project} AgencyCode={info.AgencyCode} />
          </Grid.Column>
        ))}
      </Grid>
      <br />
    </div>
  )
}

export default OrgPageProjectsList

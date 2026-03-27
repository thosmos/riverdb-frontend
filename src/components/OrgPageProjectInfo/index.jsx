import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './OrgPageProjectInfo.scss'

const OrgPageProjectInfo = ({ project, AgencyCode }) => {
  return (
    <Card className="fluid project-card eq-card project-segment">
      <Card.Content className="m-b-sm project-title">
        <Link to={`/data/${AgencyCode}?proj=${project.ProjectID}`}>
          <h5>{project.Name}</h5>
        </Link>
      </Card.Content>
      <Card.Content>
        <div>
          <p>{project.Description}</p>
          {project.Parameters && project.Parameters.length > 0 && (
            <div className="m-t-md center-button">
              <Link to={`/data/${AgencyCode}?proj=${project.ProjectID}`}>
                <Button basic color="blue" circular>
                  Explore the data
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  )
}

export default OrgPageProjectInfo

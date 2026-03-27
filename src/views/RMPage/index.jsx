import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Container, Header, Grid, Message } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'
import useUiStore from '../../store/useUiStore'
import useDataStore from '../../store/useDataStore'
import useOrganizationStore from '../../store/useOrganizationStore'
import { GET_PROJECTS, GET_STATIONS } from '../../apollo/queries'

import SelectionWrapper from '../../components/SelectionWrapper'
import Loader from '../../components/Loader'
import './RMPage.scss'

const RMPage = () => {
  const { org } = useParams()
  const [searchParams] = useSearchParams()

  const ui = useUiStore()
  const data = useDataStore()
  const organization = useOrganizationStore()

  useEffect(() => {
    if (org) {
      organization.setActiveOrganization(org)
    }
  }, [org, organization])

  const { data: projectsData, loading: projectsLoading } = useQuery(GET_PROJECTS, {
    variables: { agency: org },
    skip: !org
  })

  useEffect(() => {
    if (projectsData && projectsData.projects) {
      data.setProjects(projectsData.projects)
    }
  }, [projectsData, data])

  const { data: stationsData, loading: stationsLoading } = useQuery(GET_STATIONS, {
    variables: {
      agency: org,
      project: searchParams.get('proj') || data.activeProject?.ProjectID
    },
    skip: !org
  })

  const stations = stationsData?.stations || []

  return (
    <div id="RM">
      <Container fluid>
        <div className="page-spacer">
          <Header className="rm-data-header" size="medium" textAlign="center">
            Water Quality Monitoring Data:
          </Header>

          {ui.errorMsg.RM_Datafetch && (
            <Message color="red">
              <p>{ui.errorMsg.RM_Datafetch}</p>
            </Message>
          )}

          {(projectsLoading || stationsLoading) ? (
            <Loader />
          ) : (
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <SelectionWrapper
                    stations={stations}
                    projects={data.projects || []}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p>(Chart, Download, and Data Table components coming soon)</p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default RMPage

import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'
import useOrganizationStore from '../../store/useOrganizationStore'
import useDataStore from '../../store/useDataStore'
import useUiStore from '../../store/useUiStore'
import { GET_AGENCY, GET_PROJECTS } from '../../apollo/queries'

import OrgPageIntro from '../../components/OrgPageIntro'
import OrgPageContact from '../../components/OrgPageContact'
import OrgPageProjectsList from '../../components/OrgPageProjectsList'
import OrgPageOverviewMap from '../../components/OrgPageOverviewMap'
import './OrganizationPage.scss'

const OrganizationPage = () => {
  const { org } = useParams()
  const navigate = useNavigate()

  const activeOrganization = useOrganizationStore((state) => state.activeOrganization)
  const setActiveOrganization = useOrganizationStore((state) => state.setActiveOrganization)
  const setProjects = useDataStore((state) => state.setProjects)
  const setErrorMsg = useUiStore((state) => state.setErrorMsg)

  const { data: agencyData, error: agencyError } = useQuery(GET_AGENCY, {
    variables: { agency: org },
    skip: !org
  })

  const { data: projectsData, error: projectsError } = useQuery(GET_PROJECTS, {
    variables: { agency: org },
    skip: !org
  })

  useEffect(() => {
    if (agencyData && agencyData.agency) {
      setActiveOrganization(agencyData.agency)
    } else if (agencyData && !agencyData.agency) {
      navigate('/404')
    }
  }, [agencyData, setActiveOrganization, navigate])

  useEffect(() => {
    if (projectsData && projectsData.projects) {
      setProjects(projectsData.projects)
    }
  }, [projectsData, setProjects])

  useEffect(() => {
    if (agencyError || projectsError) {
      setErrorMsg('RM_Datafetch', "Couldn't fetch organization data")
    }
  }, [agencyError, projectsError, setErrorMsg])

  if (!activeOrganization) return null

  const info = {
    ...activeOrganization,
    Projects: projectsData?.projects || []
  }

  return (
    <div id="organization-page">
      <Container>
        <Card fluid>
          <OrgPageIntro info={info} />
          <OrgPageOverviewMap />
          <OrgPageProjectsList info={info} />
          <OrgPageContact info={info} />
        </Card>
      </Container>
    </div>
  )
}

export default OrganizationPage

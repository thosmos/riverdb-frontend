import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Container, Header, Grid, Message } from 'semantic-ui-react'
import { useQuery } from '@apollo/client'
import useUiStore from '../../store/useUiStore'
import useDataStore from '../../store/useDataStore'
import useOrganizationStore from '../../store/useOrganizationStore'
import { GET_SAFETOSWIM } from '../../apollo/queries'

import SelectionWrapper from '../../components/SelectionWrapper'
import Loader from '../../components/Loader'
import './SafeSwim.scss'

const SafeSwim = () => {
  const { org } = useParams()
  const ui = useUiStore()
  const data = useDataStore()
  const organization = useOrganizationStore()

  useEffect(() => {
    if (org) {
      organization.setActiveOrganization(org)
    }
  }, [org, organization])

  const { data: stationsData, loading, error } = useQuery(GET_SAFETOSWIM, {
    variables: {
      agency: organization.activeOrganization?.AgencyCode || org
    }
  })

  useEffect(() => {
    if (error) {
      ui.setErrorMsg('RM_Datafetch', "Couldn't fetch initial stations")
    }
  }, [error, ui])

  const stations = stationsData?.stations || []

  return (
    <div id="RM">
      <Container fluid>
        <div className="page-spacer">
          <Header className="rm-data-header" size="medium" textAlign="center">
            Safe to Swim
          </Header>
          <p style={{ textAlign: 'center' }}>
            E. coli bacteria levels across our watersheds, simplified into red or green for safety
          </p>

          {ui.errorMsg.RM_Datafetch && (
            <Message color="red">
              <p>{ui.errorMsg.RM_Datafetch}</p>
            </Message>
          )}

          {loading ? (
            <Loader />
          ) : (
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <SelectionWrapper
                    stations={stations}
                    safeOptions={{ analyte: 'ecoli' }}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
        </div>
      </Container>
    </div>
  )
}

export default SafeSwim

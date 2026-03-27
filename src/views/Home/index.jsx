import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import OrganizationList from '../../components/OrganizationList'
import OrganizationsMap from '../../components/OrganizationsMap'
import './Home.scss'

const Home = () => {
  return (
    <div id="home">
      <Container>
        <p>
          RiverDB is a cloud database and website helping environmental organizations store, analyze, and share scientific data from watershed monitoring programs.
          In addition to providing public maps, charts, and tables of our member's data, RiverDB aims to optimize the experience of repetitive data entry, report generation, and data quality checking.
        </p>
        <Header as="h2" id="org-header" textAlign="center">Participating Organizations:</Header>
        <OrganizationsMap />
        <OrganizationList />
      </Container>
    </div>
  )
}

export default Home

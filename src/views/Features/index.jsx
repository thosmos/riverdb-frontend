import React from 'react'
import { Container, Header } from 'semantic-ui-react'

const Features = () => {
  return (
    <div id="features">
      <Container>
        <Header size="medium" textAlign="center">Features</Header>
        <p>
          RiverDB is a new website helping NGOs and river organizations to display and store scientific data from river monitoring programs. It draws inspiration from and seeks to improve upon the Surface Water Ambient Monitoring Program's water quality database tools. In addition to providing public maps, charts, and tables of our member's data, RiverDB aims to optimize the experience of repetitive data entry, report generation, and data quality checking.
        </p>
      </Container>
    </div>
  )
}

export default Features

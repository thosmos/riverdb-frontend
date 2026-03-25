import React from 'react'
import { Container, Header } from 'semantic-ui-react'

const NotFound = () => {
  return (
    <Container>
      <Header size="huge" textAlign="center">404 - Not Found</Header>
      <p style={{ textAlign: 'center' }}>The page you are looking for does not exist.</p>
    </Container>
  )
}

export default NotFound

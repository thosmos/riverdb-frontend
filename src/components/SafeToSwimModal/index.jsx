import React from 'react'
import { Modal, Grid } from 'semantic-ui-react'
import useUiStore from '../../store/useUiStore'
import ChartsSafeSwim from '../ChartsSafeSwim'

const SafeToSwimModal = () => {
  const ui = useUiStore()
  const station = ui.showInfoModalStation

  const handleClose = () => {
    ui.toggleSafetoswimModal(null)
  }

  if (!station) return null

  return (
    <Modal open={ui.showSafetoswim} onClose={handleClose} size="large" closeIcon>
      <Modal.Header>{station.StationName} - Historical Chart</Modal.Header>
      <Modal.Content scrolling>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <ChartsSafeSwim swimstation={station} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

export default SafeToSwimModal

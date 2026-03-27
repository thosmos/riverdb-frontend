import React, { useState, useEffect } from 'react'
import { Modal, Header, Grid, Image } from 'semantic-ui-react'
import axios from 'axios'
import useUiStore from '../../store/useUiStore'
import useOrganizationStore from '../../store/useOrganizationStore'
import { CLOUDINARY_URL } from '../../assets/constants'
import forkNames from '../../assets/riverForkNames'
import './StationInfoModal.scss'

const StationInfoModal = () => {
  const ui = useUiStore()
  const organization = useOrganizationStore()
  const [imgUrl, setImgUrl] = useState(null)
  const [imgError, setImgError] = useState(false)
  const [imgLoading, setImgLoading] = useState(true)

  const station = ui.showInfoModalStation
  const organizationName = organization.activeOrganization?.AgencyCode

  useEffect(() => {
    if (station && organizationName) {
      const url = `${CLOUDINARY_URL}/${organizationName}_1/${station.StationID}.jpg`
      setImgLoading(true)
      setImgError(false)

      axios.get(url, { responseType: 'blob' })
        .then(res => {
          const reader = new window.FileReader()
          reader.readAsDataURL(res.data)
          reader.onload = () => {
            setImgUrl(reader.result)
            setImgLoading(false)
          }
        })
        .catch(() => {
          setImgLoading(false)
          setImgError(true)
        })
    }
  }, [station, organizationName])

  const getFork = () => {
    if (!station) return ''
    return forkNames[station.ForkTribGroup] || station.ForkTribGroup
  }

  const handleClose = () => {
    ui.toggleStationInfoModal(null)
  }

  if (!station) return null

  return (
    <Modal open={ui.showInfoModal} onClose={handleClose} size="large" closeIcon>
      <Modal.Header>{station.StationName}</Modal.Header>
      <Modal.Content scrolling>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <b>Waterbody: </b> <span>{station.LocalWaterbody}</span>
            </Grid.Column>
            <Grid.Column>
              <b>Watershed: </b> <span>{station.LocalWatershed}</span>
            </Grid.Column>
            <Grid.Column>
              <b>Riverfork: </b> <span>{getFork()}</span>
            </Grid.Column>
            <Grid.Column>
              <b>Station ID: </b> <span>{station.StationID}</span>
            </Grid.Column>
            <Grid.Column>
              <b>Latitude: </b> <span>{station.TargetLat}</span>
            </Grid.Column>
            <Grid.Column>
              <b>Longitude: </b> <span>{station.TargetLong}</span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              {imgLoading && <div className="img-placeholder">Loading image...</div>}
              {imgUrl && <Image src={imgUrl} className="station-image" centered />}
              {imgError && <div className="img-error-msg">No image available for the site</div>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

export default StationInfoModal

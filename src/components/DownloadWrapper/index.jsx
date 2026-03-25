import React, { useState } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import fileDownload from 'js-file-download'
import axios from 'axios'
import useDataStore from '../../store/useDataStore'
import useSelectionStore from '../../store/useSelectionStore'

const DownloadWrapper = () => {
  const [loadingAllStations, setLoadingAllStations] = useState(false)
  const data = useDataStore()
  const selection = useSelectionStore()

  const enableAll = data.activeProject?.ProjectType?.ident === 'sitevisit'

  const downloadSelectedStation = () => {
    if (data.selectedStation && selection.selectionRange) {
      const csv = data.selectedStation
        .setYearRange({
          startYear: selection.selectionRange[0],
          endYear: selection.selectionRange[1]
        })
        .getCSV()
      fileDownload(csv, `${data.selectedStation.info.StationName}.csv`)
    }
  }

  const downloadAllStations = () => {
    setLoadingAllStations(true)
    axios
      .get('https://admin.riverdb.org/sitevisits.csv')
      .then((res) => {
        setLoadingAllStations(false)
        fileDownload(res.data, 'complete stations.csv')
      })
      .catch((err) => {
        setLoadingAllStations(false)
        console.error(err)
      })
  }

  if (!(data.loadedStations.length > 0 && data.selectedStation)) return null

  return (
    <div id="download">
      <Grid>
        <Grid.Row centered stackable>
          <div className="m-t-md">
            <Button onClick={downloadSelectedStation}>
              Download {data.selectedStation.info.StationName}
            </Button>
          </div>
          {enableAll && (
            <div className="m-t-md">
              <Button loading={loadingAllStations} onClick={downloadAllStations}>
                Download all stations
              </Button>
            </div>
          )}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default DownloadWrapper

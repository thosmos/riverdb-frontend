import React, { useState, useEffect } from 'react'
import { Container, Segment, Button, Header } from 'semantic-ui-react'
import axios from 'axios'
import find from 'lodash/find'
import FlowGraph from '../../components/FlowGraph'
import { stations } from '../../assets/flowsStations'
import { FLOW_API_PORT, FLOW_API_IP } from '../../assets/constants'
import './FlowPage.scss'

const FlowPage = () => {
  const [info, setInfo] = useState({})
  const [period, setPeriod] = useState(7)
  const [loading, setLoading] = useState(true)
  const [key, setKey] = useState(1)
  const periods = [7, 30, 90, 365]

  const fetchFlowData = (p) => {
    setLoading(true)
    setInfo({})
    const url = import.meta.env.DEV
      ? `http://localhost:3020/?days=${p}`
      : `http://${FLOW_API_IP}:${FLOW_API_PORT}/?days=${p}`

    axios.get(url)
      .then(res => {
        setInfo(res.data)
        setLoading(false)
        setKey(prev => prev + 1)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchFlowData(period)
  }, [])

  const selectPeriod = (p) => {
    setPeriod(p)
    fetchFlowData(p)
  }

  const getStationInfo = (abbr) => find(stations, o => o.code === abbr)

  return (
    <div id="flow-page">
      <Container>
        <Header as="h1" textAlign="center">Flow Information:</Header>
        <Segment textAlign="center">
          <div className="centered-buttons">
            {periods.map(p => (
              <div key={p}>
                <Button
                  onClick={() => selectPeriod(p)}
                  active={p === period}
                  compact
                  fluid
                >
                  {p} days
                </Button>
              </div>
            ))}
          </div>
        </Segment>
        {loading ? (
          <div>Loading flow data...</div>
        ) : (
          <div>
            {stations.map(station => (
              <FlowGraph
                key={`${station.code}-${key}`}
                code={station.code}
                station={getStationInfo(station.code)}
                data={info[station.code]}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default FlowPage

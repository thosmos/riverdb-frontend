import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom'
import { ApolloProvider, useQuery } from '@apollo/client'
import client from './apollo/client'
import useUiStore from './store/useUiStore'
import useOrganizationStore from './store/useOrganizationStore'
import { GET_AGENCIES } from './apollo/queries'

// Components
import NavBar from './components/NavBar'
import PageLayout from './components/PageLayout'
import Footer from './components/Footer'
import CookieMsg from './components/CookieMsg'

// Views
import Home from './views/Home'
import About from './views/About'
import Features from './views/Features'
import SafeSwim from './views/SafeSwim'
import NotFound from './views/NotFound'
import OrganizationPage from './views/OrganizationPage'
import RMPage from './views/RMPage'
import FlowPage from './views/FlowPage'

const OrgPageWrapper = () => <Outlet />
const DataPageWrapper = () => <Outlet />
const RMPageWrapper = () => <Outlet />

const AppContent = () => {
  const location = useLocation()
  const showCookieMsg = useUiStore((state) => state.showCookieMsg)
  const clearCookieMsg = useUiStore((state) => state.clearCookieMsg)
  const setOrgs = useOrganizationStore((state) => state.setOrgs)
  const setErrorMsg = useUiStore((state) => state.setErrorMsg)

  const { data, error, loading } = useQuery(GET_AGENCIES)

  useEffect(() => {
    const cookiesOK = localStorage.getItem('cookiesOK')
    if (cookiesOK) {
      clearCookieMsg()
    }
  }, [clearCookieMsg])

  useEffect(() => {
    if (data && data.agencies) {
      setOrgs(data.agencies)
    }
  }, [data, setOrgs])

  useEffect(() => {
    if (error) {
      console.error("Apollo Error:", error)
      setErrorMsg('RM_Datafetch', "Couldn't fetch initial orgs")
    }
  }, [error, setErrorMsg])

  return (
    <div id="app-root-div">
      <NavBar />
      <PageLayout>
        {loading && <div>Loading Agencies...</div>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/safetoswim" element={<SafeSwim />} />
          <Route path="/flows" element={<FlowPage />} />
          <Route path="/org/*" element={<OrgPageWrapper />}>
             <Route path=":org" element={<OrganizationPage />} />
             <Route index element={<Navigate to="/" replace />} />
          </Route>
          <Route path="/data/*" element={<DataPageWrapper />}>
            <Route path=":org/*" element={<RMPageWrapper />}>
              <Route index element={<RMPage />} />
            </Route>
            <Route index element={<Navigate to="/" replace />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </PageLayout>
      <Footer />
      {showCookieMsg && <CookieMsg />}
    </div>
  )
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppContent />
      </Router>
    </ApolloProvider>
  )
}

export default App

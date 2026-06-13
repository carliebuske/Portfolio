import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home.jsx'
import CasePage from './pages/CasePage.jsx'
import FormaCurate from './pages/FormaCurate.jsx'
import NotFound from './pages/NotFound.jsx'

// Restore scroll to top on route change (except for in-page hash nav).
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forma-curate" element={<FormaCurate />} />
        <Route path="/work/:slug" element={<CasePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

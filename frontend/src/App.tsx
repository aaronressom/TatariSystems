import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import React, { Suspense } from 'react'
const Home = React.lazy(() => import('./pages/Home'))
const About = React.lazy(() => import('./pages/About'))
const AIPlatform = React.lazy(() => import('./pages/AIPlatform'))
const Contact = React.lazy(() => import('./pages/Contact'))
const Pricing = React.lazy(() => import('./pages/Pricing'))
const AICompute = React.lazy(() => import('./pages/AICompute'))
const OurStory = React.lazy(() => import('./pages/Story'))
const Team = React.lazy(() => import('./pages/Team'))
const Careers = React.lazy(() => import('./pages/Careers'))
const Blog = React.lazy(() => import('./pages/Blog'))
const PressReleases = React.lazy(() => import('./pages/PressReleases'))
const Research = React.lazy(() => import('./pages/Research'))
const Mining = React.lazy(() => import('./pages/Mining'))
const Infrastructure = React.lazy(() => import('./pages/Infrastructure'))
const ExploreOurTech = React.lazy(() => import('./pages/OmniStack'))
const Login = React.lazy(() => import('./pages/Login'))

// Custom hook to scroll to top on route change
const useScrollToTop = () => {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])
}

function App() {
  useScrollToTop()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#000',color:'#fff',fontSize:24}}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-platform" element={<AIPlatform />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-compute" element={<AICompute />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/team" element={<Team />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/press-releases" element={<PressReleases />} />
          <Route path="/research" element={<Research />} />
          <Route path="/mining" element={<Mining />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/explore-our-tech" element={<ExploreOurTech />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default App 
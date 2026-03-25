import './App.css'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import GothicAtmosphere from './components/GothicAtmosphere'
import GothicFooter from './components/GothicFooter'
import Navbar from './components/Navbar'
import { useGlobalScrollReveal } from './hooks/useScrollReveal'
import CosmologyPage from './pages/CosmologyPage'
import HomePage from './pages/HomePage'
import HymnsKenPage from './pages/HymnsKenPage'
import HymnsVinPage from './pages/HymnsVinPage'
import EntropyArtPage from './pages/EntropyArtPage'
import PathToWisdomPage from './pages/PathToWisdomPage'

// Generates CSS-based ember/ash falling particles into the starfield div
function EmberField() {
  return (
    <div className="starfield" aria-hidden="true">
      <div className="starfield-aura" />
      {Array.from({ length: 60 }, (_, i) => {
        const left    = (i * 1.72 + Math.sin(i * 1.3) * 6).toFixed(1)
        const delay   = (i * 0.2 + Math.sin(i * 2.1) * 1.2).toFixed(2)
        const dur     = (8 + Math.cos(i * 0.7) * 5).toFixed(2)
        const isCinder = i % 9 === 0
        const size    = isCinder ? (3 + Math.sin(i * 0.8) * 1.5).toFixed(1) : (1 + Math.sin(i * 1.9) * 1.2).toFixed(1)
        const isAsh   = i % 3 === 0
        const isGhost = i % 7 === 0
        const isSpark = i % 11 === 0

        const color = isCinder
          ? `rgba(139,92,246,0.55)` // large vivid purple cinder
          : isSpark
          ? `rgba(160,110,255,0.7)` // bright violet spark
          : isGhost
          ? `rgba(100,60,200,0.45)` // ghost particle
          : isAsh
          ? `rgba(40,20,80,0.4)` // deep indigo ash
          : `rgba(${45 + Math.floor(i * 3) % 40},${20 + Math.floor(i * 2) % 20},${100 + Math.floor(i * 4) % 80},0.45)`

        const anim = isSpark ? 'spark-rise' : i % 2 === 0 ? 'ember-fall' : 'ember-drift'

        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: isSpark ? '100%' : '-8px',
              width: `${size}px`,
              height: isAsh ? `${parseFloat(size) * 2}px` : isCinder ? `${parseFloat(size) * 1.5}px` : `${size}px`,
              borderRadius: isAsh ? '1px' : isCinder ? '2px' : '50%',
              background: color,
              boxShadow: isCinder
                ? `0 0 ${parseFloat(size) * 6}px rgba(139,92,246,0.6), 0 0 ${parseFloat(size) * 12}px rgba(100,50,200,0.25)`
                : isSpark
                ? `0 0 ${parseFloat(size) * 5}px rgba(160,110,255,0.6)`
                : isGhost
                ? `0 0 ${parseFloat(size) * 3}px rgba(100,60,200,0.35)`
                : `0 0 ${parseFloat(size) * 2}px ${color}`,
              animation: `${anim} ${dur}s linear ${delay}s infinite`,
              pointerEvents: 'none',
            }}
          />
        )
      })}
    </div>
  )
}

function App() {
  const location = useLocation()

  // Scroll-reveal for all sections
  useGlobalScrollReveal()

  // Re-apply scroll reveal on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08 }
      )
      const targets = document.querySelectorAll('.scroll-reveal:not(.revealed)')
      targets.forEach(el => observer.observe(el))
      return () => observer.disconnect()
    }, 100)
    return () => clearTimeout(timer)
  }, [location.pathname])

  // Softer scroll-linked atmosphere on the background
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const sf = document.querySelector('.starfield')
      if (sf) {
        sf.style.setProperty('--scroll-shift', `${Math.min(scrolled * 0.04, 28)}px`)
        sf.style.setProperty('--scroll-glow', `${Math.min(scrolled / 1600, 0.16)}`)
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <EmberField />
      <GothicAtmosphere />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"               element={<HomePage />} />
          <Route path="/hymns-vin"      element={<HymnsVinPage />} />
          <Route path="/hymns-ken"      element={<HymnsKenPage />} />
          <Route path="/cosmology"      element={<CosmologyPage />} />
          <Route path="/path-to-wisdom" element={<PathToWisdomPage />} />
          <Route path="/entropy-art"    element={<EntropyArtPage />} />
          <Route path="*"               element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <GothicFooter />
    </div>
  )
}

export default App

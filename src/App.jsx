import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CosmologyPage from './pages/CosmologyPage'
import HomePage from './pages/HomePage'
import HymnsKenPage from './pages/HymnsKenPage'
import HymnsVinPage from './pages/HymnsVinPage'
import PathToWisdomPage from './pages/PathToWisdomPage'

function App() {
  return (
    <div className="app">
      <div className="starfield" aria-hidden="true" />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hymns-vin" element={<HymnsVinPage />} />
          <Route path="/hymns-ken" element={<HymnsKenPage />} />
          <Route path="/cosmology" element={<CosmologyPage />} />
          <Route path="/path-to-wisdom" element={<PathToWisdomPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

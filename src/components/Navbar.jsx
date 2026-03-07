import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../data/content'

function Navbar() {
  const [isLogoOpen, setIsLogoOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsLogoOpen(false)
      }
    }

    if (isLogoOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLogoOpen])

  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        <div className="brand-wrap">
          <button
            type="button"
            className="brand-logo-trigger"
            onClick={() => setIsLogoOpen(true)}
            aria-label="Open logo preview"
          >
            <img src="/logo.png" alt="Vindom logo" className="brand-logo" />
          </button>
          <Link to="/" className="brand">
            Vindom
          </Link>
        </div>
        <div className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
              end={link.path === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {isLogoOpen && (
        <div
          className="logo-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Vindom logo enlarged preview"
          onClick={() => setIsLogoOpen(false)}
        >
          <div className="logo-modal-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="logo-modal-close"
              onClick={() => setIsLogoOpen(false)}
              aria-label="Close logo preview"
            >
              Close
            </button>
            <img src="/logo.png" alt="Vindom logo enlarged" className="logo-modal-image" />
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

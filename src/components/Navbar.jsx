import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../data/content'

function Navbar() {
  const [isLogoOpen, setIsLogoOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="navbar-wrap"
      style={{
        borderBottom: '1px solid transparent',
        borderImage: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent) 1',
        borderBottomColor: scrolled ? 'rgba(80,70,160,0.7)' : 'rgba(50,40,100,0.5)',
        boxShadow: scrolled
          ? '0 4px 40px rgba(0,0,0,0.95), 0 0 20px rgba(30,20,80,0.2)'
          : '0 4px 30px rgba(0,0,0,0.85)',
        transition: 'border-bottom-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
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
          {/* Gothic skull accent */}
          <span
            aria-hidden="true"
            style={{
              color: 'rgba(139,92,246,0.5)',
              fontSize: '0.75rem',
              marginLeft: '0.2rem',
              lineHeight: 1,
              alignSelf: 'center',
            }}
          >
            ☠
          </span>
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
          <div
            className="logo-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="logo-modal-close"
              onClick={() => setIsLogoOpen(false)}
              aria-label="Close logo preview"
            >
              ✕ Close
            </button>
            <img
              src="/logo.png"
              alt="Vindom logo enlarged"
              className="logo-modal-image"
            />
            <p
              style={{
                textAlign: 'center',
                fontFamily: "'Cinzel', serif",
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(139,92,246,0.6)',
                marginTop: '0.8rem',
                marginBottom: 0,
              }}
            >
              ✦ Order, Change, Becoming ✦
            </p>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

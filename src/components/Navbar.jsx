import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../data/content'

function Navbar() {
  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        <Link to="/" className="brand">
          Vindom
        </Link>
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
    </header>
  )
}

export default Navbar

import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import logoUrl from '../../assets/logo.jpg'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { currentUser, logout } = useAuth()

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [mobileOpen])

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.logoBrand}>
          <img src={logoUrl} alt="U Dorm Logo" className={styles.logoImg} />
          <span className={styles.brandName}>U Dorm</span>
        </NavLink>

        <div className={styles.navLinks}>
          <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.active}` : ''}>Home</NavLink>
          <NavLink to="/listings" className={({ isActive }) => isActive ? `${styles.active}` : ''}>Listings</NavLink>
          <NavLink to="/roommates" className={({ isActive }) => isActive ? `${styles.active}` : ''}>Roommates</NavLink>
        </div>

        <div className={styles.navEdgeLinks}>
          {currentUser ? (
            <div className={styles.userMenu}>
              <button 
                className={styles.userMenuBtn}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <img src={currentUser.avatar} alt={currentUser.name} className={styles.userAvatar} />
                <span className={styles.userName}>{currentUser.name}</span>
                <i className={`fas fa-chevron-down ${userMenuOpen ? styles.rotated : ''}`}></i>
              </button>
              
              {userMenuOpen && (
                <div className={styles.userDropdown}>
                  <NavLink to="/profile" onClick={() => setUserMenuOpen(false)}>
                    <i className="fas fa-user"></i> Profile
                  </NavLink>
                  <NavLink to="/list-property" onClick={() => setUserMenuOpen(false)}>
                    <i className="fas fa-plus"></i> List Property
                  </NavLink>
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" className={`${styles.navBtn} ${styles.navLogin}`}>Login</NavLink>
              <NavLink to="/signup" className={`${styles.navBtn} ${styles.navSignup}`}>Sign Up</NavLink>
            </>
          )}
        </div>

        <button className={styles.mobileMenuBtn} onClick={() => setMobileOpen(v => !v)}>
          <i className={mobileOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
        
        {mobileOpen && (
          <div className={styles.navLinksMobile} onClick={() => setMobileOpen(false)}>
            <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.active}` : ''}>Home</NavLink>
            <NavLink to="/listings" className={({ isActive }) => isActive ? `${styles.active}` : ''}>Listings</NavLink>
            <NavLink to="/roommates" className={({ isActive }) => isActive ? `${styles.active}` : ''}>Roommates</NavLink>
            
            {currentUser ? (
              <>
                <NavLink to="/profile" className={({ isActive }) => isActive ? `${styles.active}` : ''}>Profile</NavLink>
                <NavLink to="/list-property" className={({ isActive }) => isActive ? `${styles.active}` : ''}>List Property</NavLink>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={`${styles.navBtn} ${styles.navLogin}`}>Login</NavLink>
                <NavLink to="/signup" className={`${styles.navBtn} ${styles.navSignup}`}>Sign Up</NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

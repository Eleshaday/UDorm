import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('udorm_user')
    if (savedUser) setCurrentUser(JSON.parse(savedUser))
    setLoading(false)
  }, [])

  const signup = async (userData) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userData.name || `${userData.firstName} ${userData.lastName}`.trim(), email: userData.email, password: userData.password })
      })
      const data = await res.json()
      if (!res.ok) return { success: false, error: data.error || 'Failed to register' }
      localStorage.setItem('token', data.token)
      localStorage.setItem('udorm_user', JSON.stringify(data.user))
      setCurrentUser(data.user)
      return { success: true, user: data.user }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) return { success: false, error: data.error || 'Failed to login' }
      localStorage.setItem('token', data.token)
      localStorage.setItem('udorm_user', JSON.stringify(data.user))
      setCurrentUser(data.user)
      return { success: true, user: data.user }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('udorm_user')
    localStorage.removeItem('token')
  }

  const updateProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates }
    setCurrentUser(updatedUser)
    localStorage.setItem('udorm_user', JSON.stringify(updatedUser))
  }

  const toggleFavorite = (listingId) => {
    const updatedFavorites = (currentUser?.favorites || []).includes(listingId)
      ? currentUser.favorites.filter((id) => id !== listingId)
      : [...(currentUser?.favorites || []), listingId]
    updateProfile({ favorites: updatedFavorites })
  }

  const value = { currentUser, signup, login, logout, updateProfile, toggleFavorite, loading }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

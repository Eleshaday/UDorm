import { useEffect, useState } from 'react'
import styles from './TenantDashboard.module.css'
import { useAuth } from '../../hooks/useAuth'

export default function TenantDashboard() {
  const { fetchFavorites } = useAuth()
  const [favorites, setFavorites] = useState([])
  useEffect(() => {
    fetchFavorites().then(setFavorites)
  }, [])
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Dashboard</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Favorites</div>
          <div className={styles.cardBody}>
            {favorites.length === 0 && 'Save listings to view them here.'}
            <div style={{ display: 'grid', gap: '8px', marginTop: '0.5rem' }}>
              {favorites.map((f) => (
                <div key={f._id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 8 }}>
                  <div style={{ fontWeight: 600 }}>{f.listing?.title}</div>
                  <div style={{ color: '#666' }}>{f.listing?.location} • ${f.listing?.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Profile</div>
          <div className={styles.cardBody}>Update your preferences in your profile.</div>
        </div>
      </div>
    </div>
  )
}



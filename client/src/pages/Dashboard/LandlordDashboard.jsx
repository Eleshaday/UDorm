import { useEffect, useState } from 'react'
import styles from './LandlordDashboard.module.css'

export default function LandlordDashboard() {
  const [listings, setListings] = useState([])
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    async function load() {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/listings/mine/owner', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      if (!res.ok) return
      const data = await res.json()
      setListings(data)
    }
    load()
  }, [])

  useEffect(() => {
    async function loadBookings() {
      const token = localStorage.getItem('token')
      const r = await fetch('/api/bookings/received', { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      if (r.ok) setBookings(await r.json())
    }
    loadBookings()
  }, [])

  async function updateStatus(id, status) {
    const token = localStorage.getItem('token')
    const r = await fetch(`/api/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    })
    if (r.ok) setBookings((prev) => prev.map(b => b._id === id ? { ...b, status } : b))
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Listings</h1>
      <div className={styles.grid}>
        {listings.map((l) => (
          <div key={l._id} className={styles.card}>
            <img src={l.images?.[0] || ''} alt={l.title} />
            <div className={styles.cardBody}>
              <div className={styles.cardTitle}>{l.title}</div>
              <div className={styles.cardMeta}>${l.price} • {l.location}</div>
            </div>
          </div>
        ))}
      </div>
      <h2 className={styles.title} style={{ marginTop: '2rem' }}>Received Inquiries</h2>
      <div className={styles.grid}>
        {bookings.map((b) => (
          <div key={b._id} className={styles.card}>
            <div className={styles.cardBody}>
              <div className={styles.cardTitle}>{b.message || 'Booking Inquiry'}</div>
              <div className={styles.cardMeta}>{b.startDate} → {b.endDate} • Status: {b.status}</div>
              <div style={{ marginTop: '0.5rem' }}>
                <button className={styles.cardBtn} onClick={() => updateStatus(b._id, 'approved')}>Approve</button>
                <button className={styles.cardBtn} onClick={() => updateStatus(b._id, 'declined')} style={{ marginLeft: '0.5rem' }}>Decline</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}




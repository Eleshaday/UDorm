import { useEffect, useState } from 'react'
import styles from './AdminPage.module.css'

export default function AdminPage() {
  const [summary, setSummary] = useState(null)
  useEffect(() => {
    async function load() {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/admin/summary', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      if (!res.ok) return
      setSummary(await res.json())
    }
    load()
  }, [])
  if (!summary) return null
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <div className={styles.cards}>
        <div className={styles.card}><div className={styles.cardLabel}>Users</div><div className={styles.cardValue}>{summary.users}</div></div>
        <div className={styles.card}><div className={styles.cardLabel}>Landlords</div><div className={styles.cardValue}>{summary.landlords}</div></div>
        <div className={styles.card}><div className={styles.cardLabel}>Tenants</div><div className={styles.cardValue}>{summary.tenants}</div></div>
        <div className={styles.card}><div className={styles.cardLabel}>Listings</div><div className={styles.cardValue}>{summary.listings}</div></div>
      </div>
    </div>
  )
}




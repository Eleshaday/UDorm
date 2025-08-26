import { useEffect, useState } from 'react'

export default function Sent() {
  const [items, setItems] = useState([])
  useEffect(() => {
    async function load() {
      const token = localStorage.getItem('token')
      const r = await fetch('/api/messages/sent', { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      if (r.ok) setItems(await r.json())
    }
    load()
  }, [])
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Sent</h1>
      <div style={{ display: 'grid', gap: '12px', marginTop: '1rem' }}>
        {items.map(m => (
          <div key={m._id} style={{ background: '#fff', border: '1px solid #eee', borderRadius: 10, padding: '12px' }}>
            <div style={{ fontWeight: 600 }}>{m.body}</div>
            <div style={{ color: '#666', fontSize: 12 }}>{new Date(m.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}



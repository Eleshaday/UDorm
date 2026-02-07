import { Router } from 'express'
import { requireRole } from '../middleware/auth.js'
import User from '../models/User.js'
import Listing from '../models/Listing.js'

const router = Router()

router.get('/summary', requireRole('admin'), async (_req, res) => {
  try {
    const [users, landlords, tenants, listings] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ role: 'landlord' }),
      User.countDocuments({ role: 'tenant' }),
      Listing.countDocuments({}),
    ])
    res.json({ users, landlords, tenants, listings })
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router




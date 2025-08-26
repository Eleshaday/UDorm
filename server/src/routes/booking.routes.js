import { Router } from 'express'
import { requireRole } from '../middleware/auth.js'
import Booking from '../models/Booking.js'
import Listing from '../models/Listing.js'

const router = Router()

// Tenant creates booking/inquiry
router.post('/', requireRole('tenant', 'admin'), async (req, res) => {
  try {
    const { listing, startDate, endDate, message } = req.body
    const list = await Listing.findById(listing).populate('owner')
    if (!list) return res.status(404).json({ error: 'Listing not found' })
    const doc = await Booking.create({ listing, tenant: req.userId, landlord: list.owner, startDate, endDate, message })
    res.status(201).json(doc)
  } catch (e) {
    res.status(400).json({ error: 'Invalid booking data' })
  }
})

// Landlord views received bookings
router.get('/received', requireRole('landlord', 'admin'), async (req, res) => {
  const items = await Booking.find({ landlord: req.userId }).sort({ createdAt: -1 }).lean()
  res.json(items)
})

// Tenant views own bookings
router.get('/mine', requireRole('tenant', 'admin'), async (req, res) => {
  const items = await Booking.find({ tenant: req.userId }).sort({ createdAt: -1 }).lean()
  res.json(items)
})

// Landlord updates booking status
router.patch('/:id/status', requireRole('landlord', 'admin'), async (req, res) => {
  const { status } = req.body
  if (!['pending', 'approved', 'declined'].includes(status)) return res.status(400).json({ error: 'Bad status' })
  const doc = await Booking.findOneAndUpdate({ _id: req.params.id, landlord: req.userId }, { status }, { new: true })
  if (!doc) return res.status(404).json({ error: 'Not found' })
  res.json(doc)
})

export default router



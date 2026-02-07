import { Router } from 'express'
import { requireRole } from '../middleware/auth.js'
import Review from '../models/Review.js'

const router = Router()

router.get('/:listingId', async (req, res) => {
  const items = await Review.find({ listing: req.params.listingId }).sort({ createdAt: -1 }).lean()
  res.json(items)
})

router.post('/', requireRole('tenant', 'admin'), async (req, res) => {
  try {
    const { listing, rating, comment } = req.body
    const doc = await Review.create({ listing, rating, comment, author: req.userId })
    res.status(201).json(doc)
  } catch (e) {
    res.status(400).json({ error: 'Invalid review data' })
  }
})

export default router



import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import Favorite from '../models/Favorite.js'

const router = Router()

router.get('/', requireAuth, async (req, res) => {
  const items = await Favorite.find({ user: req.userId }).populate('listing').lean()
  res.json(items)
})

router.post('/', requireAuth, async (req, res) => {
  try {
    const { listing } = req.body
    const fav = await Favorite.findOneAndUpdate(
      { user: req.userId, listing },
      { $setOnInsert: { user: req.userId, listing } },
      { upsert: true, new: true }
    )
    res.status(201).json(fav)
  } catch (e) {
    res.status(400).json({ error: 'Invalid favorite' })
  }
})

router.delete('/:listingId', requireAuth, async (req, res) => {
  await Favorite.findOneAndDelete({ user: req.userId, listing: req.params.listingId })
  res.json({ ok: true })
})

export default router



import { Router } from 'express'
import Listing from '../models/Listing.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/listings?search=&minPrice=&maxPrice=&amenities=Furnished,Gym
router.get('/', async (req, res) => {
  try {
    const { search = '', minPrice, maxPrice, amenities } = req.query
    const query = {}
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ]
    }
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }
    if (amenities) {
      const list = String(amenities).split(',').filter(Boolean)
      if (list.length) query.amenities = { $all: list }
    }
    const listings = await Listing.find(query).sort({ createdAt: -1 }).lean()
    res.json(listings)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/listings/:id
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
    if (!listing) return res.status(404).json({ error: 'Not found' })
    res.json(listing)
  } catch (err) {
    res.status(404).json({ error: 'Not found' })
  }
})

// POST /api/listings (protected)
router.post('/', requireAuth, async (req, res) => {
  try {
    const listing = await Listing.create({ ...req.body, owner: req.userId })
    res.status(201).json(listing)
  } catch (err) {
    res.status(400).json({ error: 'Invalid listing data' })
  }
})

export default router




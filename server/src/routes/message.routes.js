import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import Message from '../models/Message.js'

const router = Router()

// Send message
router.post('/', requireAuth, async (req, res) => {
  try {
    const { to, listing, body } = req.body
    const msg = await Message.create({ from: req.userId, to, listing, body })
    res.status(201).json(msg)
  } catch (e) {
    res.status(400).json({ error: 'Invalid message' })
  }
})

// Inbox
router.get('/inbox', requireAuth, async (req, res) => {
  const items = await Message.find({ to: req.userId }).sort({ createdAt: -1 }).lean()
  res.json(items)
})

// Sent
router.get('/sent', requireAuth, async (req, res) => {
  const items = await Message.find({ from: req.userId }).sort({ createdAt: -1 }).lean()
  res.json(items)
})

export default router



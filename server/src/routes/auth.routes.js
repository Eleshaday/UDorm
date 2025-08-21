import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ error: 'Email already in use' })
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash })
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }
    res.status(201).json({ token, user: safeUser })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }
    res.json({ token, user: safeUser })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router




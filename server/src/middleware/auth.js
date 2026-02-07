import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ error: 'Unauthorized' })
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    req.userId = payload.sub
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization || ''
      const token = header.startsWith('Bearer ') ? header.slice(7) : null
      if (!token) return res.status(401).json({ error: 'Unauthorized' })
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
      if (!roles.includes(payload.role)) return res.status(403).json({ error: 'Forbidden' })
      req.userId = payload.sub
      req.userRole = payload.role
      next()
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }
}




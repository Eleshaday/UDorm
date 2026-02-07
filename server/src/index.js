import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { connectToDatabase } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import listingRoutes from './routes/listing.routes.js'
import adminRoutes from './routes/admin.routes.js'
import bookingRoutes from './routes/booking.routes.js'
import reviewRoutes from './routes/review.routes.js'
import messageRoutes from './routes/message.routes.js'
import favoriteRoutes from './routes/favorite.routes.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'udorm-api' })
})

app.use('/api/auth', authRoutes)
app.use('/api/listings', listingRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/favorites', favoriteRoutes)

const port = process.env.PORT || 5000

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API listening on port ${port}`)
    })
  })
  .catch((err) => {
    console.error('Failed to init server', err)
    process.exit(1)
  })




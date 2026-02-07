import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true, index: true },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    startDate: { type: String },
    endDate: { type: String },
    message: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending', index: true },
  },
  { timestamps: true }
)

export default mongoose.model('Booking', bookingSchema)



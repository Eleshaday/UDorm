import mongoose from 'mongoose'

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    distance: { type: String },
    images: [String],
    amenities: [String],
    available: { type: String },
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

export default mongoose.model('Listing', listingSchema)




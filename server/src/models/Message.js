import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', index: true },
    body: { type: String, required: true },
    readAt: { type: Date },
  },
  { timestamps: true }
)

export default mongoose.model('Message', messageSchema)



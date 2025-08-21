import mongoose from 'mongoose'

const preferencesSchema = new mongoose.Schema(
  {
    budget: String,
    moveInDate: String,
    roommates: String,
    lifestyle: [String],
  },
  { _id: false }
)

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    university: String,
    major: String,
    year: String,
    avatar: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
    preferences: preferencesSchema,
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)




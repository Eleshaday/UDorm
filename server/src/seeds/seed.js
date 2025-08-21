import 'dotenv/config'
import mongoose from 'mongoose'
import Listing from '../models/Listing.js'

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/udorm')
  await Listing.deleteMany({})
  await Listing.insertMany([
    {
      title: 'Cozy Studio Near Campus',
      price: 850,
      location: 'Downtown',
      bedrooms: 1,
      bathrooms: 1,
      distance: '5 min walk',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      ],
      amenities: ['Furnished', 'Parking', 'Laundry'],
      available: '2024-08-01',
      description: 'Charming studio perfect for students.',
    },
    {
      title: 'Modern 2BR Apartment',
      price: 1200,
      location: 'University District',
      bedrooms: 2,
      bathrooms: 2,
      distance: '10 min walk',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      ],
      amenities: ['Gym', 'Pool', 'Furnished'],
      available: '2024-07-15',
      description: 'Spacious apartment close to campus.',
    },
    {
      title: 'Shared House - Private Room',
      price: 650,
      location: 'West Campus',
      bedrooms: 1,
      bathrooms: 1,
      distance: '15 min walk',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      ],
      amenities: ['Pet Friendly', 'Backyard', 'Kitchen'],
      available: '2024-08-15',
      description: 'Private room in a shared house.',
    },
  ])
  console.log('Seeded listings')
  await mongoose.disconnect()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})




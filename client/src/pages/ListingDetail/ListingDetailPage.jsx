import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './ListingDetailPage.module.css'
import { useAuth } from '../../hooks/useAuth'

export default function ListingDetailPage() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [reviews, setReviews] = useState([])
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [messageText, setMessageText] = useState('')
  const [dates, setDates] = useState({ start: '', end: '' })
  const { currentUser } = useAuth()

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/listings/${id}`)
      if (!res.ok) return
      const data = await res.json()
      setListing(data)
    }
    load()
  }, [id])

  useEffect(() => {
    async function loadReviews() {
      const r = await fetch(`/api/reviews/${id}`)
      const d = await r.json()
      setReviews(d)
    }
    loadReviews()
  }, [id])

  async function sendMessage() {
    if (!currentUser) { alert('Login required'); return }
    const token = localStorage.getItem('token')
    if (!token) return
    // fallback: send to listing owner if available
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ to: listing.owner, listing: listing._id, body: messageText })
    })
    if (res.ok) { setMessageText(''); alert('Message sent') } else { alert('Failed') }
  }

  async function createBooking() {
    if (!currentUser) { alert('Login required'); return }
    const token = localStorage.getItem('token')
    if (!token) return
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ listing: listing._id, startDate: dates.start, endDate: dates.end, message: messageText })
    })
    if (res.ok) { alert('Inquiry sent') } else { alert('Failed') }
  }

  async function addReview() {
    if (!currentUser) { alert('Login required'); return }
    const token = localStorage.getItem('token')
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ listing: listing._id, rating: Number(reviewRating), comment: reviewText })
    })
    if (res.ok) { setReviewText(''); const d = await res.json(); setReviews([d, ...reviews]) } else { alert('Failed') }
  }

  if (!listing) return null

  return (
    <div className={styles.propertyContainer}>
      <div className={styles.propertyHeader}>
        <div>
          <h1 className={styles.propertyTitle}>{listing.title}</h1>
          <div className={styles.propertyLocation}><i className="fas fa-map-marker-alt"></i> {listing.location}</div>
        </div>
        <div className={styles.propertyPrice}>${listing.price}<span className={styles.pricePeriod}>/month</span></div>
      </div>

      <div className={styles.propertyGallery}>
        <div className={styles.mainImage}>
          <img src={listing.images?.[0] || ''} alt={listing.title} />
          <div className={styles.viewAllPhotos}><i className="fas fa-camera"></i> View All 12 Photos</div>
        </div>
        {(listing.images || []).slice(1, 5).map((img, idx) => (
          <div key={idx} className={styles.secondaryImage}><img src={img} alt={`${listing.title}-${idx}`} /></div>
        ))}
      </div>

      <div className={styles.propertyDetails}>
        <div className={styles.propertyLeft}>
          <div className={styles.propertyDescription}>
            <h2 className={styles.sectionTitle}>About This Property</h2>
            <p className={styles.propertyText}>{listing.description}</p>
          </div>

          <div className={styles.propertyFeatures}>
            <h2 className={styles.sectionTitle}>Features</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureItem}><div className={styles.featureIcon}><i className="fas fa-home"></i></div><div className={styles.featureText}><strong>Property Type:</strong> <span>{listing.bedrooms >= 2 ? 'Apartment' : 'Studio'}</span></div></div>
              <div className={styles.featureItem}><div className={styles.featureIcon}><i className="fas fa-bed"></i></div><div className={styles.featureText}><strong>Bedrooms:</strong> <span>{listing.bedrooms}</span></div></div>
              <div className={styles.featureItem}><div className={styles.featureIcon}><i className="fas fa-bath"></i></div><div className={styles.featureText}><strong>Bathrooms:</strong> <span>{listing.bathrooms}</span></div></div>
              <div className={styles.featureItem}><div className={styles.featureIcon}><i className="fas fa-ruler-combined"></i></div><div className={styles.featureText}><strong>Square Feet:</strong> <span>650</span></div></div>
              <div className={styles.featureItem}><div className={styles.featureIcon}><i className="fas fa-calendar-alt"></i></div><div className={styles.featureText}><strong>Available:</strong> <span>{listing.available}</span></div></div>
              <div className={styles.featureItem}><div className={styles.featureIcon}><i className="fas fa-walking"></i></div><div className={styles.featureText}><strong>Walk Score:</strong> <span>92 (Walker's Paradise)</span></div></div>
            </div>
          </div>

          <div className={styles.propertyAmenities}>
            <h2 className={styles.sectionTitle}>Amenities</h2>
            <div className={styles.amenitiesList}>
              {(listing.amenities || []).map((a) => (
                <div key={a} className={styles.amenityItem}><i className="fas fa-check"></i> {a}</div>
              ))}
            </div>
          </div>

          <div className={styles.propertyDescription}>
            <h2 className={styles.sectionTitle}>Reviews</h2>
            <div>
              {reviews.map(r => (
                <div key={r._id} className={styles.propertyText}>⭐ {r.rating} — {r.comment}</div>
              ))}
            </div>
            {currentUser && (
              <div style={{ marginTop: '1rem' }}>
                <select value={reviewRating} onChange={(e) => setReviewRating(e.target.value)}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <input value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write a review" style={{ marginLeft: '0.5rem' }} />
                <button onClick={addReview} className={styles.contactBtn} style={{ marginLeft: '0.5rem' }}>Post</button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.propertyRight}>
          <div className={styles.contactCard}>
            <div className={styles.contactHeader}>
              <div className={styles.contactAvatar}><img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="John Smith" /></div>
              <div>
                <div className={styles.contactName}>John Smith</div>
                <div className={styles.contactRole}>Property Manager</div>
                <div className={styles.propertyBadge}>Verified</div>
              </div>
            </div>
            <button className={styles.contactBtn} onClick={sendMessage}><i className="fas fa-envelope"></i> Contact Now</button>
            <div className={styles.contactMethod}><i className="fas fa-phone"></i><span>(555) 123-4567</span></div>
            <div className={styles.contactMethod}><i className="fas fa-envelope"></i><span>john@universityheights.com</span></div>
            <div className={styles.contactMethod}><i className="fas fa-clock"></i><span>Available 9am-5pm, Mon-Fri</span></div>
            <div style={{ marginTop: '1.5rem' }}>
              <button className={`${styles.contactBtn} ${styles.secondary}`}><i className="fas fa-heart"></i> Save Listing</button>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <input type="date" value={dates.start} onChange={(e) => setDates({ ...dates, start: e.target.value })} />
              <input type="date" value={dates.end} onChange={(e) => setDates({ ...dates, end: e.target.value })} style={{ marginLeft: '0.5rem' }} />
              <button className={styles.contactBtn} onClick={createBooking} style={{ marginLeft: '0.5rem' }}>Send Inquiry</button>
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <input value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder="Message to landlord" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.similarListings}>
        <h2 className={styles.sectionTitle}>Similar Listings Nearby</h2>
        <div className={styles.listingsGrid}>
          <div className={styles.listingCard}>
            <div className={styles.listingImage}><img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Campus View Apartments" /></div>
            <div className={styles.listingDetails}>
              <div className={styles.listingPrice}>$1,100<span className={styles.pricePeriod}>/month</span></div>
              <h3 className={styles.listingTitle}>Campus View Apartments</h3>
              <div className={styles.listingLocation}><i className="fas fa-map-marker-alt"></i>0.4mi from Downtown Campus</div>
              <div className={styles.listingFeatures}><div className={styles.feature}><i className="fas fa-bed"></i>1 bed</div><div className={styles.feature}><i className="fas fa-bath"></i>1 bath</div><div className={styles.feature}><i className="fas fa-ruler-combined"></i>450 sqft</div></div>
            </div>
          </div>
          <div className={styles.listingCard}>
            <div className={styles.listingImage}><img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Green Street House" /></div>
            <div className={styles.listingDetails}>
              <div className={styles.listingPrice}>$700<span className={styles.pricePeriod}>/month</span></div>
              <h3 className={styles.listingTitle}>Green Street House</h3>
              <div className={styles.listingLocation}><i className="fas fa-map-marker-alt"></i>0.6mi from Downtown Campus</div>
              <div className={styles.listingFeatures}><div className={styles.feature}><i className="fas fa-bed"></i>Private room</div><div className={styles.feature}><i className="fas fa-users"></i>3 roommates</div></div>
            </div>
          </div>
          <div className={styles.listingCard}>
            <div className={styles.listingImage}><img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="The Collegiate" /></div>
            <div className={styles.listingDetails}>
              <div className={styles.listingPrice}>$950<span className={styles.pricePeriod}>/month</span></div>
              <h3 className={styles.listingTitle}>The Collegiate</h3>
              <div className={styles.listingLocation}><i className="fas fa-map-marker-alt"></i>0.2mi from Downtown Campus</div>
              <div className={styles.listingFeatures}><div className={styles.feature}><i className="fas fa-bed"></i>2 beds</div><div className={styles.feature}><i className="fas fa-bath"></i>1 bath</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


import styles from './ListingDetailPage.module.css'

export default function ListingDetailPage() {
  return (
    <div className={styles.propertyContainer}>
      <div className={styles.propertyHeader}>
        <div>
          <h1 className={styles.propertyTitle}>University Heights Apartments</h1>
          <div className={styles.propertyLocation}><i className="fas fa-map-marker-alt"></i> 123 College Ave, University Town • 0.3mi from Downtown Campus</div>
        </div>
        <div className={styles.propertyPrice}>$850<span className={styles.pricePeriod}>/month</span></div>
      </div>

      <div className={styles.propertyGallery}>
        <div className={styles.mainImage}>
          <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="University Heights" />
          <div className={styles.viewAllPhotos}><i className="fas fa-camera"></i> View All 12 Photos</div>
        </div>
        <div className={styles.secondaryImage}><img src="https://images.unsplash.com/photo-1583845112203-4541b01c57a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Living Room" /></div>
        <div className={styles.secondaryImage}><img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Kitchen" /></div>
        <div className={styles.secondaryImage}><img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Bedroom" /></div>
        <div className={styles.secondaryImage}><img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Bathroom" /></div>
      </div>

      <div className={styles.propertyDetails}>
        <div className={styles.propertyLeft}>
          <div className={styles.propertyDescription}>
            <h2 className={styles.sectionTitle}>About This Property</h2>
            <p className={styles.propertyText}>Modern apartment complex located just steps from campus. This 2-bedroom, 1-bath unit features hardwood floors, stainless steel appliances, and in-unit laundry. The building offers 24/7 security, a fitness center, and study lounges on each floor. Perfect for students who want convenience and comfort.</p>
            <p className={styles.propertyText}>Available August 1st for the upcoming school year. Utilities include water, trash, and high-speed internet. Electricity is separately metered. Parking available for additional fee. Pet-friendly with restrictions.</p>
          </div>

          <div className={styles.propertyFeatures}>
            <h2 className={styles.sectionTitle}>Features</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureItem}><div className={styles.featureIcon}><i className="fas fa-home"></i></div><div className={styles.featureText}><strong>Property Type:</strong> <span>Apartment</span></div></div>
              <div className={styles.featureItem}><div className={styles.featureIcon}><i className="fas fa-bed"></i></div><div className={styles.featureText}><strong>Bedrooms:</strong> <span>2</span></div></div>
              <div className={styles.featureItem}><div className={styles.featureIcon}><i className="fas fa-bath"></i></div><div className={styles.featureText}><strong>Bathrooms:</strong> <span>1</span></div></div>
              <div className={styles.featureItem}><div className={styles.featureIcon}><i className="fas fa-ruler-combined"></i></div><div className={styles.featureText}><strong>Square Feet:</strong> <span>650</span></div></div>
              <div className={styles.featureItem}><div className={styles.featureIcon}><i className="fas fa-calendar-alt"></i></div><div className={styles.featureText}><strong>Available:</strong> <span>August 1, 2023</span></div></div>
              <div className={styles.featureItem}><div className={styles.featureIcon}><i className="fas fa-walking"></i></div><div className={styles.featureText}><strong>Walk Score:</strong> <span>92 (Walker's Paradise)</span></div></div>
            </div>
          </div>

          <div className={styles.propertyAmenities}>
            <h2 className={styles.sectionTitle}>Amenities</h2>
            <div className={styles.amenitiesList}>
              <div className={styles.amenityItem}><i className="fas fa-wifi"></i> High-speed Internet</div>
              <div className={styles.amenityItem}><i className="fas fa-tshirt"></i> In-unit Washer/Dryer</div>
              <div className={styles.amenityItem}><i className="fas fa-utensils"></i> Stainless Steel Appliances</div>
              <div className={styles.amenityItem}><i className="fas fa-dumbbell"></i> Fitness Center</div>
              <div className={styles.amenityItem}><i className="fas fa-book"></i> Study Lounges</div>
              <div className={styles.amenityItem}><i className="fas fa-lock"></i> 24/7 Security</div>
              <div className={styles.amenityItem}><i className="fas fa-paw"></i> Pet Friendly</div>
              <div className={styles.amenityItem}><i className="fas fa-parking"></i> Parking Available</div>
              <div className={styles.amenityItem}><i className="fas fa-bicycle"></i> Bike Storage</div>
              <div className={styles.amenityItem}><i className="fas fa-swimming-pool"></i> Rooftop Deck</div>
            </div>
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
            <button className={styles.contactBtn}><i className="fas fa-envelope"></i> Contact Now</button>
            <div className={styles.contactMethod}><i className="fas fa-phone"></i><span>(555) 123-4567</span></div>
            <div className={styles.contactMethod}><i className="fas fa-envelope"></i><span>john@universityheights.com</span></div>
            <div className={styles.contactMethod}><i className="fas fa-clock"></i><span>Available 9am-5pm, Mon-Fri</span></div>
            <div style={{ marginTop: '1.5rem' }}>
              <button className={`${styles.contactBtn} ${styles.secondary}`}><i className="fas fa-heart"></i> Save Listing</button>
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


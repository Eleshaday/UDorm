import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1>Find Your Perfect Student Housing</h1>
            <p>Discover affordable, safe, and convenient dormitories and apartments near your campus. Join thousands of students who found their ideal home through UDorm.</p>
            <div className={styles.heroCta}>
              <a href="#" className={styles.primaryBtn}>Get Started</a>
              <a href="#" className={styles.secondaryBtn}>Sign in</a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Student dormitory" />
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Why Choose UDorm?</h2>
          <p>We make finding student housing simple, safe, and stress-free with our unique platform features.</p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><i className="fas fa-search-location"></i></div>
            <h3>Verified Listings</h3>
            <p>Every property is personally verified by our team to ensure quality and accuracy of information.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><i className="fas fa-user-friends"></i></div>
            <h3>Roommate Matching</h3>
            <p>Our smart algorithm helps you find compatible roommates based on your preferences and lifestyle.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><i className="fas fa-map-marked-alt"></i></div>
            <h3>Campus Proximity</h3>
            <p>Filter listings by distance to your campus to find the most convenient locations.</p>
          </div>
        </div>
      </section>

      <section className={styles.listingsPreview}>
        <div className={styles.listingsContainer}>
          <div className={styles.sectionHeader}>
            <h2>Featured Listings</h2>
            <p>Explore some of our most popular student housing options near top universities.</p>
          </div>
          <div className={styles.listingsGrid}>
            <div className={styles.listingCard}>
              <div className={styles.listingImage}>
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Modern dormitory" />
              </div>
              <div className={styles.listingDetails}>
                <h3>University Heights</h3>
                <div className={styles.listingLocation}><i className="fas fa-map-marker-alt"></i><span>0.3mi from Downtown Campus</span></div>
                <div className={styles.listingPrice}>$850/month</div>
                <div className={styles.listingFeatures}>
                  <span><i className="fas fa-bed"></i> 2 beds</span>
                  <span><i className="fas fa-bath"></i> 1 bath</span>
                  <span><i className="fas fa-ruler-combined"></i> 650 sqft</span>
                </div>
              </div>
            </div>
            <div className={styles.listingCard}>
              <div className={styles.listingImage}>
                <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Cozy apartment" />
              </div>
              <div className={styles.listingDetails}>
                <h3>Campus View Apartments</h3>
                <div className={styles.listingLocation}><i className="fas fa-map-marker-alt"></i><span>Across from North Campus</span></div>
                <div className={styles.listingPrice}>$1,100/month</div>
                <div className={styles.listingFeatures}>
                  <span><i className="fas fa-bed"></i> 1 bed</span>
                  <span><i className="fas fa-bath"></i> 1 bath</span>
                  <span><i className="fas fa-ruler-combined"></i> 450 sqft</span>
                </div>
              </div>
            </div>
            <div className={styles.listingCard}>
              <div className={styles.listingImage}>
                <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Shared house" />
              </div>
              <div className={styles.listingDetails}>
                <h3>Green Street House</h3>
                <div className={styles.listingLocation}><i className="fas fa-map-marker-alt"></i><span>10min walk to Engineering Quad</span></div>
                <div className={styles.listingPrice}>$700/month</div>
                <div className={styles.listingFeatures}>
                  <span><i className="fas fa-bed"></i> Private room</span>
                  <span><i className="fas fa-users"></i> 3 roommates</span>
                  <span><i className="fas fa-home"></i> Shared house</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.viewAll}>
            <a href="#" className={styles.secondaryBtn}>View All Listings</a>
          </div>
        </div>
      </section>

      <section className={styles.testimonials}>
        <div className={styles.sectionHeader}>
          <h2>What Students Say</h2>
          <p>Hear from students who found their perfect housing through UDorm.</p>
        </div>
        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialText}>
              UDorm made finding my apartment so easy! The roommate matching feature is amazing - I found someone who shares my study habits and lifestyle.
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Student" />
              </div>
              <div className={styles.authorInfo}>
                <h4>Sarah Johnson</h4>
                <p>Computer Science, State University</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialText}>
              The proximity filters helped me find a place just 5 minutes from campus. No more rushing to early morning classes!
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Student" />
              </div>
              <div className={styles.authorInfo}>
                <h4>Mike Chen</h4>
                <p>Engineering, Tech University</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialText}>
              Verified listings gave me peace of mind. I knew exactly what to expect when I moved in, and everything was exactly as described.
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Student" />
              </div>
              <div className={styles.authorInfo}>
                <h4>Emily Rodriguez</h4>
                <p>Business, City College</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2>Ready to Find Your Perfect Home?</h2>
          <p>Join thousands of students who have already found their ideal housing through UDorm. Start your search today and discover affordable, safe, and convenient options near your campus.</p>
          <div className={styles.heroCta}>
            <a href="#" className={styles.primaryBtn}>Start Your Search</a>
            <a href="#" className={styles.secondaryBtn}>Learn More</a>
          </div>
        </div>
      </section>
    </div>
  )
}


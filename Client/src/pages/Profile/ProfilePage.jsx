import styles from './ProfilePage.module.css'

export default function ProfilePage() {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileSidebar}>
        <div className={styles.profileHeader}>
          <div className={styles.profileImage}><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Sarah Johnson" /></div>
          <h2 className={styles.profileName}>Sarah Johnson</h2>
          <div className={styles.profileUniversity}><i className="fas fa-university"></i>State University</div>
          <div className={styles.matchBadge}>92% Match</div>
        </div>
        <div className={styles.profileActions}>
          <button className={styles.profileBtn}><i className="fas fa-envelope"></i> Message</button>
          <button className={`${styles.profileBtn} ${styles.secondary}`}><i className="far fa-heart"></i> Add to Favorites</button>
        </div>
        <div className={styles.profileDetailsList}>
          <div className={styles.detailItem}><span className={styles.detailLabel}>Age:</span><span className={styles.detailValue}>22</span></div>
          <div className={styles.detailItem}><span className={styles.detailLabel}>Major:</span><span className={styles.detailValue}>Computer Science</span></div>
          <div className={styles.detailItem}><span className={styles.detailLabel}>Year:</span><span className={styles.detailValue}>Senior</span></div>
          <div className={styles.detailItem}><span className={styles.detailLabel}>Budget:</span><span className={styles.detailValue}>$800-$1,000</span></div>
          <div className={styles.detailItem}><span className={styles.detailLabel}>Move-in Date:</span><span className={styles.detailValue}>August 2023</span></div>
        </div>
      </div>
      <div className={styles.profileContent}>
        <section className={styles.profileSection}>
          <h3 className={styles.sectionTitle}>About Me</h3>
          <p className={styles.profileBio}>Hi! I'm Sarah, a Computer Science major at State University. I'm looking for a quiet, clean living environment where I can focus on my studies. I'm usually in bed by 11pm and up by 7am. I enjoy hiking on weekends and occasionally cooking with roommates. I prefer a pet-free environment and don't smoke. My ideal living situation would be with 1-2 roommates who value cleanliness and quiet study time.</p>
          <div className={styles.profileTags}>
            <span className={styles.tag}>Early Riser</span>
            <span className={styles.tag}>Neat Freak</span>
            <span className={styles.tag}>No Pets</span>
            <span className={styles.tag}>Non-Smoker</span>
            <span className={styles.tag}>Vegetarian</span>
            <span className={styles.tag}>Quiet Hours</span>
          </div>
        </section>
        <section className={styles.compatibilitySection}>
          <h3 className={styles.sectionTitle}>Our Compatibility</h3>
          <div className={styles.compatibilityGrid}>
            {[['Sleep Schedule',95],['Cleanliness',90],['Study Habits',88],['Social Preferences',85],['Guest Policy',80],['Temperature',75]].map(([label, pct]) => (
              <div className={styles.compatibilityItem} key={label}>
                <div className={styles.compatibilityCategory}>{label}</div>
                <div className={styles.compatibilityMeter}><div className={styles.compatibilityFill} style={{ width: `${pct}%` }}></div></div>
                <div className={styles.compatibilityPercent}>{pct}% match</div>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.gallerySection}>
          <h3 className={styles.sectionTitle}>Lifestyle Photos</h3>
          <div className={styles.gallery}>
            <div className={styles.galleryItem}><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Study space" /></div>
            <div className={styles.galleryItem}><img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Cooking" /></div>
            <div className={styles.galleryItem}><img src="https://images.unsplash.com/photo-1470114716159-e389f8712fda?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Hiking" /></div>
          </div>
        </section>
      </div>
    </div>
  )
}


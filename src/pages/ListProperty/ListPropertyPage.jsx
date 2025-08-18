import styles from './ListPropertyPage.module.css'

export default function ListPropertyPage() {
  return (
    <main className={styles.listingFormContainer}>
      <div className={styles.formHeader}>
        <h1>List Your Property</h1>
        <p>Fill out this form to connect with thousands of students looking for housing</p>
      </div>

      <div className={styles.stepIndicator}>
        <div className={`${styles.step} ${styles.active}`} data-step="1">1</div>
        <div className={styles.step} data-step="2">2</div>
        <div className={styles.step} data-step="3">3</div>
        <div className={styles.step} data-step="4">4</div>
      </div>

      <div className={`${styles.formStep} ${styles.active}`}>
        <h2>Basic Information</h2>
        <div className={styles.formGroup}><label htmlFor="property-title">Property Title*</label><input id="property-title" placeholder="e.g. 'Cozy Studio Near Campus'" /></div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}><label htmlFor="property-type">Property Type*</label><select id="property-type"><option value="">Select type</option><option value="dorm">Dormitory</option><option value="apartment">Apartment</option><option value="house">Shared House</option><option value="studio">Studio</option><option value="other">Other</option></select></div>
          <div className={styles.formGroup}><label htmlFor="campus-distance">Distance to Campus*</label><select id="campus-distance"><option value="">Select distance</option><option value="walking">Walking distance (&lt;10 min)</option><option value="short-commute">Short commute (10-20 min)</option><option value="medium-commute">Medium commute (20-30 min)</option><option value="long-commute">Long commute (30+ min)</option></select></div>
        </div>
        <div className={styles.formGroup}><label htmlFor="property-address">Full Address*</label><input id="property-address" placeholder="Street address, city, state, ZIP" /></div>
      </div>

      <div className={styles.formStep}>
        <h2>Property Details</h2>
        <div className={styles.formRow}>
          <div className={styles.formGroup}><label htmlFor="bedrooms">Bedrooms*</label><select id="bedrooms"><option value="">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4+">4+</option></select></div>
          <div className={styles.formGroup}><label htmlFor="bathrooms">Bathrooms*</label><select id="bathrooms"><option value="">Select</option><option value="1">1</option><option value="1.5">1.5</option><option value="2">2</option><option value="2+">2+</option></select></div>
          <div className={styles.formGroup}><label htmlFor="square-feet">Square Feet</label><input id="square-feet" placeholder="Approximate size" type="number" /></div>
        </div>
        <div className={styles.formGroup}><label>Available From*</label><input type="date" id="available-date" /></div>
        <div className={styles.formGroup}><label>Monthly Rent ($)*</label><input type="number" id="monthly-rent" placeholder="Enter amount" /></div>
        <div className={styles.formGroup}><label>Utilities Included</label>
          <div className={styles.amenitiesGrid}>
            {['Water','Electricity','Gas','Internet','None'].map((a) => (
              <label key={a} className={styles.amenityOption}><input type="checkbox" /> {a}</label>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.formStep}>
        <h2>Amenities & Features</h2>
        <div className={styles.formGroup}><label>Property Features</label>
          <div className={styles.amenitiesGrid}>
            {['Furnished','Parking','Laundry','Air Conditioning','Heating','Gym','Pool','Pet Friendly','Smoking Allowed','Wheelchair Access'].map((a) => (
              <label key={a} className={styles.amenityOption}><input type="checkbox" /> {a}</label>
            ))}
          </div>
        </div>
        <div className={styles.formGroup}><label htmlFor="property-description">Property Description*</label><textarea id="property-description" placeholder="Describe your property, nearby amenities, and any rules or restrictions"></textarea></div>
      </div>

      <div className={styles.formStep}>
        <h2>Add Photos</h2>
        <p>Upload at least 3 photos to showcase your property (max 10 photos)</p>
        <div className={styles.photoUpload}><i className="fas fa-cloud-upload-alt"></i><p>Click to upload or drag and drop</p><p className={styles.small}>JPEG or PNG, max 5MB each</p></div>
        <div className={styles.formGroup}><label htmlFor="contact-name">Your Name*</label><input id="contact-name" placeholder="Property owner/manager" /></div>
        <div className={styles.formGroup}><label htmlFor="contact-email">Email*</label><input id="contact-email" placeholder="For student inquiries" type="email" /></div>
        <div className={styles.formGroup}><label htmlFor="contact-phone">Phone Number*</label><input id="contact-phone" placeholder="For urgent contact" type="tel" /></div>
      </div>

      <div className={styles.formActions}>
        <button className={`${styles.btn} ${styles.btnOutline}`}>Previous</button>
        <button className={`${styles.btn} ${styles.btnPrimary}`}>Next</button>
      </div>
    </main>
  )
}


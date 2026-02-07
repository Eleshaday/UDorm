import { NavLink } from 'react-router-dom'
import logoUrl from '../../assets/logo.jpg'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerAbout}>
          <div className={styles.footerLogo}>
            <img src={logoUrl} alt="U Dorm Logo" />
            <span>U Dorm</span>
          </div>
          <p>UDorm is the leading platform connecting students with quality housing options near campuses nationwide.</p>
          <div className={styles.socialLinks}>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className={styles.footerLinks}>
          <h3>Quick Links</h3>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/listings">Listings</NavLink></li>
            <li><NavLink to="/roommates">Roommates</NavLink></li>
            <li><a href="#">How It Works</a></li>
            <li><NavLink to="/list-property">Post a Listing</NavLink></li>
          </ul>
        </div>
        <div className={styles.footerLinks}>
          <h3>Support</h3>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Safety Tips</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div className={styles.footerNewsletter}>
          <h3>Newsletter</h3>
          <p>Subscribe to get updates on new listings and student housing tips.</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" />
            <button type="submit"><i className="fas fa-paper-plane"></i></button>
          </form>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2023 UDorm. All rights reserved.</p>
      </div>
    </footer>
  )
}

import { useMemo, useState } from 'react'
import styles from './RoommatesPage.module.css'

const initialProfiles = [
  {
    id: 1,
    name: 'Sarah Johnson',
    university: 'State University',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    match: 92,
    bio: 'Computer Science major looking for a quiet study environment. I\'m clean, organized, and usually in bed by 11pm.',
    tags: ['Early Riser', 'Neat Freak', 'No Pets'],
    favorited: false,
  },
  {
    id: 2,
    name: 'Michael Chen',
    university: 'Tech Institute',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    match: 75,
    bio: 'Engineering student who enjoys cooking and occasional game nights. Looking for roommates who respect shared spaces.',
    tags: ['Social', 'Vegetarian', 'Gamer'],
    favorited: false,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    university: 'City College',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    match: 58,
    bio: 'Art history major with a small, well-behaved dog. Looking for pet-friendly housing with one or two roommates.',
    tags: ['Pet Owner', 'Night Owl', 'Creative'],
    favorited: true,
  },
]

export default function RoommatesPage() {
  const [profiles, setProfiles] = useState(initialProfiles)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ university: '', major: '', budget: '' })
  const [criteria, setCriteria] = useState({ sleep: true, cleanliness: true, study: true, social: true, pets: true, smoking: true })

  const results = useMemo(() => {
    return profiles.filter((p) => {
      const text = `${p.name} ${p.university} ${p.tags.join(' ')}`.toLowerCase()
      const matchesSearch = searchTerm === '' || text.includes(searchTerm.toLowerCase())
      const matchesUniversity = filters.university === '' || p.university.toLowerCase().includes(filters.university)
      const matchesMajor = filters.major === '' || text.includes(filters.major)
      const matchesBudget = filters.budget === '' || text.includes(filters.budget)
      return matchesSearch && matchesUniversity && matchesMajor && matchesBudget
    })
  }, [profiles, searchTerm, filters])

  function toggleFavorite(id) {
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, favorited: !p.favorited } : p)))
  }

  return (
    <div className={styles.roommateContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Find Your Perfect Roommate</h1>
        <p className={styles.pageSubtitle}>Connect with students who share your lifestyle, study habits, and preferences to find the ideal living situation.</p>
      </div>

      <div className={styles.searchFilters}>
        <div className={styles.searchBar}>
          <input className={styles.searchInput} placeholder="Search by university, major, or interests..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button className={styles.searchBtn}>Search</button>
        </div>
        <div className={styles.filterOptions}>
          <div className={styles.filterGroup}>
            <label htmlFor="university">University</label>
            <select id="university" value={filters.university} onChange={(e) => setFilters({ ...filters, university: e.target.value })}>
              <option value="">Any University</option>
              <option value="state">State University</option>
              <option value="tech">Tech Institute</option>
              <option value="city">City College</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="major">Major</label>
            <select id="major" value={filters.major} onChange={(e) => setFilters({ ...filters, major: e.target.value })}>
              <option value="">Any Major</option>
              <option value="business">Business</option>
              <option value="engineering">Engineering</option>
              <option value="arts">Arts & Humanities</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label htmlFor="budget">Budget</label>
            <select id="budget" value={filters.budget} onChange={(e) => setFilters({ ...filters, budget: e.target.value })}>
              <option value="">Any Budget</option>
              <option value="low">$500-$800/month</option>
              <option value="medium">$800-$1,200/month</option>
              <option value="high">$1,200+/month</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.matchCriteria}>
        <h3>Match Preferences</h3>
        <div className={styles.criteriaGrid}>
          {Object.keys(criteria).map((key) => (
            <label key={key} className={styles.criterion}>
              <input type="checkbox" checked={criteria[key]} onChange={(e) => setCriteria({ ...criteria, [key]: e.target.checked })} />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.profilesGrid}>
        {results.map((p) => (
          <div key={p.id} className={styles.profileCard}>
            <div className={styles.profileImage}>
              <img src={p.avatar} alt={p.name} />
              <button className={`${styles.favoriteBtn} ${p.favorited ? styles.favorited : ''}`} onClick={() => toggleFavorite(p.id)}>
                <i className={p.favorited ? 'fas fa-heart' : 'far fa-heart'}></i>
              </button>
              <span className={`${styles.matchBadge} ${p.match >= 80 ? '' : p.match >= 60 ? styles.matchMedium : styles.matchLow}`}>{p.match}% Match</span>
            </div>
            <div className={styles.profileDetails}>
              <h3 className={styles.profileName}>{p.name}</h3>
              <div className={styles.profileUniversity}><i className="fas fa-university"></i>{p.university}</div>
              <div className={styles.compatibilityMeter}>
                <div className={`${styles.compatibilityFill} ${p.match >= 80 ? '' : p.match >= 60 ? styles.compatibilityMedium : styles.compatibilityLow}`} style={{ width: `${p.match}%` }}></div>
              </div>
              <p className={styles.profileBio}>{p.bio}</p>
              <div className={styles.profileTags}>{p.tags.map((t) => (<span className={styles.tag} key={t}>{t}</span>))}</div>
              <div className={styles.profileActions}>
                <a href="#" className={styles.btnPrimary}>Message</a>
                <a href="/profile" className={styles.btnSecondary}>View Profile</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button className={`${styles.pageBtn} ${styles.disabled}`}><i className="fas fa-chevron-left"></i></button>
        <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
        <button className={styles.pageBtn}>2</button>
        <button className={styles.pageBtn}>3</button>
        <button className={styles.pageBtn}>4</button>
        <button className={styles.pageBtn}>5</button>
        <button className={styles.pageBtn}><i className="fas fa-chevron-right"></i></button>
      </div>
    </div>
  )
}


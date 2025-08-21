import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './ListingsPage.module.css'

const initialListings = []

export default function ListingsPage() {
  const [listings, setListings] = useState(initialListings)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [moveInDate, setMoveInDate] = useState('')
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [propertyType, setPropertyType] = useState('')
  const [distanceFilter, setDistanceFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  useEffect(() => {
    async function load() {
      const params = new URLSearchParams()
      if (searchTerm) params.set('search', searchTerm)
      if (priceRange[0] > 0) params.set('minPrice', String(priceRange[0]))
      if (priceRange[1] < 2000) params.set('maxPrice', String(priceRange[1]))
      if (selectedAmenities.length) params.set('amenities', selectedAmenities.join(','))
      const res = await fetch(`/api/listings?${params.toString()}`)
      const data = await res.json()
      const mapped = data.map((l) => ({
        id: l._id,
        title: l.title,
        price: l.price,
        location: l.location,
        bedrooms: l.bedrooms,
        bathrooms: l.bathrooms,
        distance: l.distance,
        image: l.images?.[0] || '',
        amenities: l.amenities || [],
        available: l.available || '',
        favorited: false,
      }))
      setListings(mapped)
    }
    load()
  }, [searchTerm, priceRange, selectedAmenities])

  const amenities = ['Furnished', 'Parking', 'Laundry', 'Gym', 'Pool', 'Pet Friendly', 'Backyard', 'Kitchen']

  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          listing.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1]
      
      const matchesDate = !moveInDate || listing.available >= moveInDate
      
      const matchesAmenities = selectedAmenities.length === 0 || 
                              selectedAmenities.every(amenity => listing.amenities.includes(amenity))
      
      const matchesType = !propertyType || 
                         (propertyType === 'studio' && listing.bedrooms === 1) ||
                         (propertyType === 'apartment' && listing.bedrooms >= 2) ||
                         (propertyType === 'house' && listing.title.toLowerCase().includes('house'))
      
      const matchesDistance = !distanceFilter || listing.distance.includes(distanceFilter)

      return matchesSearch && matchesPrice && matchesDate && matchesAmenities && matchesType && matchesDistance
    })
  }, [listings, searchTerm, priceRange, moveInDate, selectedAmenities, propertyType, distanceFilter])

  const toggleFavorite = (id) => {
    setListings(prev => prev.map(listing => 
      listing.id === id ? { ...listing, favorited: !listing.favorited } : listing
    ))
  }

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const clearFilters = () => {
    setSearchTerm('')
    setPriceRange([0, 2000])
    setMoveInDate('')
    setSelectedAmenities([])
    setPropertyType('')
    setDistanceFilter('')
  }

  return (
    <div className={styles.listingsPage}>
      <div className={styles.listingsContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Find Your Perfect Home</h1>
          <p className={styles.pageSubtitle}>Discover student-friendly housing options near your campus</p>
        </div>

        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search by location, property name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button
              className={styles.filterToggle}
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className="fas fa-filter"></i>
              Filters
            </button>
          </div>

          {showFilters && (
            <div className={styles.filtersPanel}>
              <div className={styles.filterRow}>
                <div className={styles.filterGroup}>
                  <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className={styles.priceSlider}
                  />
                  <div className={styles.priceInputs}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])}
                    />
                  </div>
                </div>

                <div className={styles.filterGroup}>
                  <label>Move-in Date</label>
                  <input
                    type="date"
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className={styles.dateInput}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label>Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="">Any Type</option>
                    <option value="studio">Studio</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>Distance to Campus</label>
                  <select
                    value={distanceFilter}
                    onChange={(e) => setDistanceFilter(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="">Any Distance</option>
                    <option value="5">5 min walk</option>
                    <option value="10">10 min walk</option>
                    <option value="15">15+ min walk</option>
                  </select>
                </div>
              </div>

              <div className={styles.amenitiesFilter}>
                <label>Amenities</label>
                <div className={styles.amenitiesGrid}>
                  {amenities.map(amenity => (
                    <label key={amenity} className={styles.amenityCheckbox}>
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                      />
                      {amenity}
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.filterActions}>
                <button onClick={clearFilters} className={styles.clearFilters}>
                  Clear All Filters
                </button>
                <span className={styles.resultCount}>
                  {filteredListings.length} properties found
                </span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.listingsGrid}>
          {filteredListings.map(listing => (
            <div key={listing.id} className={styles.listingCard}>
              <div className={styles.listingImage}>
                <img src={listing.image} alt={listing.title} />
                <button
                  className={`${styles.favoriteBtn} ${listing.favorited ? styles.favorited : ''}`}
                  onClick={() => toggleFavorite(listing.id)}
                >
                  <i className={listing.favorited ? 'fas fa-heart' : 'far fa-heart'}></i>
                </button>
                <span className={styles.distance}>{listing.distance}</span>
              </div>

              <div className={styles.listingDetails}>
                <h3 className={styles.listingTitle}>{listing.title}</h3>
                <div className={styles.listingLocation}>
                  <i className="fas fa-map-marker-alt"></i>
                  {listing.location}
                </div>
                <div className={styles.listingSpecs}>
                  <span><i className="fas fa-bed"></i> {listing.bedrooms} BR</span>
                  <span><i className="fas fa-bath"></i> {listing.bathrooms} BA</span>
                  <span><i className="fas fa-calendar"></i> {listing.available}</span>
                </div>
                <div className={styles.listingAmenities}>
                  {listing.amenities.slice(0, 3).map(amenity => (
                    <span key={amenity} className={styles.amenityTag}>{amenity}</span>
                  ))}
                  {listing.amenities.length > 3 && (
                    <span className={styles.moreAmenities}>+{listing.amenities.length - 3} more</span>
                  )}
                </div>
                <div className={styles.listingPrice}>
                  <span className={styles.price}>${listing.price}</span>
                  <span className={styles.pricePeriod}>/month</span>
                </div>
                <Link to={`/listing/${listing.id}`} className={styles.viewDetails}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className={styles.noResults}>
            <i className="fas fa-search"></i>
            <h3>No properties found</h3>
            <p>Try adjusting your search criteria or filters</p>
            <button onClick={clearFilters} className={styles.clearFilters}>
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


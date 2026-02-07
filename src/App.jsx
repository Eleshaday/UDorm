import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import SignupPage from './pages/Signup/SignupPage'
import ListingsPage from './pages/Listings/ListingsPage'
import ListingDetailPage from './pages/ListingDetail/ListingDetailPage'
import RoommatesPage from './pages/Roommates/RoommatesPage'
import ProfilePage from './pages/Profile/ProfilePage'
import ListPropertyPage from './pages/ListProperty/ListPropertyPage'

import './App.css'
import ExpensiveComponent from './components/try'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listing/:id" element={<ListingDetailPage />} />
          <Route path="/roommates" element={<RoommatesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/list-property" element={<ListPropertyPage />} />
          <Route path="/try" element={<ExpensiveComponent />} ></Route>
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App

import { useAuth } from '../../hooks/useAuth'
import LandlordDashboard from './LandlordDashboard'
import TenantDashboard from './TenantDashboard'

export default function Dashboard() {
  const { currentUser } = useAuth()
  if (!currentUser) return null
  if (currentUser.role === 'landlord') return <LandlordDashboard />
  if (currentUser.role === 'admin') return <LandlordDashboard />
  return <TenantDashboard />
}



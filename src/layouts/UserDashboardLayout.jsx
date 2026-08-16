// ============================================================
// User Dashboard Layout
// ============================================================
//
// Wraps all user dashboard pages with a sidebar for navigation.
// Uses the shared DashboardLayout component.
// ============================================================

import DashboardLayout from '../layouts/DashboardLayout'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteIcon from '@mui/icons-material/Favorite'
import EventIcon from '@mui/icons-material/Event'
import LockIcon from '@mui/icons-material/Lock'

const sidebarItems = [
  { label: 'Profile', path: '/dashboard', icon: <PersonIcon /> },
  { label: 'Favorites', path: '/dashboard/favorites', icon: <FavoriteIcon /> },
  { label: 'Bookings', path: '/dashboard/bookings', icon: <EventIcon /> },
  { label: 'Change Password', path: '/dashboard/password', icon: <LockIcon /> },
]

export default function UserDashboardLayout() {
  return <DashboardLayout sidebarItems={sidebarItems} title="My Dashboard" />
}

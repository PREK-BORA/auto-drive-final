// ============================================================
// Admin Dashboard Layout
// ============================================================
//
// Wraps all admin dashboard pages with a sidebar for navigation.
// ============================================================

import DashboardLayout from '../layouts/DashboardLayout'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import BuildIcon from '@mui/icons-material/Build'
import PeopleIcon from '@mui/icons-material/People'
import MessageIcon from '@mui/icons-material/Message'

const sidebarItems = [
  { label: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
  { label: 'Vehicles', path: '/admin/vehicles', icon: <DirectionsCarIcon /> },
  { label: 'Services', path: '/admin/services', icon: <BuildIcon /> },
  { label: 'Users', path: '/admin/users', icon: <PeopleIcon /> },
  { label: 'Messages', path: '/admin/messages', icon: <MessageIcon /> },
]

export default function AdminDashboardLayout() {
  return <DashboardLayout sidebarItems={sidebarItems} title="Admin Panel" />
}

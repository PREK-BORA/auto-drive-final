// ============================================================
// Public Layout
// ============================================================
//
// This layout wraps all public-facing pages. It renders the
// Navbar at the top, the page content in the middle, and the
// Footer at the bottom.
//
// The <Outlet /> from React Router renders the current page.
// ============================================================

import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Box } from '@mui/material'

export default function PublicLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

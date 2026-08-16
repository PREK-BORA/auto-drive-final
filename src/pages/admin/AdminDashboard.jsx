// ============================================================
// Admin Dashboard - Overview Page
// ============================================================
//
// Shows summary statistics (total users, vehicles, services,
// messages) and a simple chart.
// ============================================================

import { useEffect, useState } from 'react'
import { Box, Grid, Card, CardContent, Typography, Paper } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import BuildIcon from '@mui/icons-material/Build'
import MessageIcon from '@mui/icons-material/Message'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import LoadingSpinner from '../../components/LoadingSpinner'
import { getDashboardStats, getVehicles } from '../../services/firestoreService'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [statsData, vehicles] = await Promise.all([getDashboardStats(), getVehicles()])
      setStats(statsData)

      // Build chart data: count vehicles per brand
      const brandCount = {}
      vehicles.forEach((v) => {
        brandCount[v.brand] = (brandCount[v.brand] || 0) + 1
      })
      setChartData(Object.entries(brandCount).map(([brand, count]) => ({ brand, vehicles: count })))
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <LoadingSpinner message="Loading dashboard..." />

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: <PeopleIcon />, color: '#1976d2' },
    { label: 'Total Vehicles', value: stats.totalVehicles, icon: <DirectionsCarIcon />, color: '#0d47a1' },
    { label: 'Total Services', value: stats.totalServices, icon: <BuildIcon />, color: '#2e7d32' },
    { label: 'Total Messages', value: stats.totalMessages, icon: <MessageIcon />, color: '#ed6c02' },
  ]

  return (
    <Box className="fade-in">
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Dashboard Overview
      </Typography>

      {/* Stat cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase' }}>
                      {card.label}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, mt: 0.5 }}>
                      {card.value}
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: card.color, color: 'white', borderRadius: 2, p: 1.5 }}>
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Chart */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <TrendingUpIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Vehicles by Brand
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="brand" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="vehicles" fill="#0d47a1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

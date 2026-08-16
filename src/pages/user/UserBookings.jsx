// ============================================================
// User Dashboard - Bookings
// ============================================================
//
// Shows the user's vehicle bookings (test drive requests).
// In this demo, bookings are stored in localStorage.
// ============================================================

import { Box, Card, CardContent, Typography, Chip, Grid } from '@mui/material'
import EventIcon from '@mui/icons-material/Event'

// Sample bookings for demonstration
const sampleBookings = [
  { id: 'b1', vehicle: 'BMW M4 Competition', date: '2024-07-25', time: '10:00 AM', status: 'confirmed' },
  { id: 'b2', vehicle: 'Tesla Model 3', date: '2024-07-28', time: '2:30 PM', status: 'pending' },
]

export default function UserBookings() {
  return (
    <Box className="fade-in">
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        My Bookings
      </Typography>

      {sampleBookings.length === 0 ? (
        <Card sx={{ p: 6, textAlign: 'center' }}>
          <EventIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            You have no bookings yet.
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {sampleBookings.map((booking) => (
            <Grid item xs={12} md={6} key={booking.id}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {booking.vehicle}
                    </Typography>
                    <Chip
                      label={booking.status}
                      color={booking.status === 'confirmed' ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                    <EventIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2">
                      {booking.date} at {booking.time}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

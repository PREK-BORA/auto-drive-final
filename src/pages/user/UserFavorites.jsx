// ============================================================
// User Dashboard - Favorite Vehicles
// ============================================================
//
// Shows the vehicles the user has favorited.
// ============================================================

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Chip } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LoadingSpinner from '../../components/LoadingSpinner'
import { getFavorites, getVehicleById, removeFavorite } from '../../services/firestoreService'
import { useAuth } from '../../context/AuthContext'

const FALLBACK_IMAGE = 'https://images.pexels.com/photos/170782/pexels-photo-170782.jpeg?auto=compress&cs=tinysrgb&w=800'

function getImageUrl(image) {
  if (typeof image === 'string') return image
  if (image && typeof image === 'object') return image.url || ''
  return ''
}

export default function UserFavorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFavorites = async () => {
    if (!user) return
    const favs = await getFavorites(user.uid)
    // Fetch full vehicle details for each favorite
    const vehicles = await Promise.all(
      favs.map(async (f) => {
        const vehicle = await getVehicleById(f.vehicleId)
        return vehicle ? { ...vehicle, favId: f.id } : null
      }),
    )
    setFavorites(vehicles.filter(Boolean))
    setLoading(false)
  }

  useEffect(() => {
    fetchFavorites()
  }, [user])

  const handleRemove = async (vehicleId) => {
    await removeFavorite(user.uid, vehicleId)
    setFavorites(favorites.filter((v) => v.id !== vehicleId))
  }

  if (loading) return <LoadingSpinner message="Loading favorites..." />

  return (
    <Box className="fade-in">
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        My Favorite Vehicles
      </Typography>

      {favorites.length === 0 ? (
        <Card sx={{ p: 6, textAlign: 'center' }}>
          <FavoriteIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
            You have not favorited any vehicles yet.
          </Typography>
          <Button variant="contained" component={Link} to="/vehicles">
            Browse Vehicles
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((vehicle) => (
            <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
              <Card className="card-shadow-hover">
                <CardMedia
                  component="img"
                  image={getImageUrl(vehicle.images?.[0]) || FALLBACK_IMAGE}
                  alt={vehicle.name}
                  sx={{ height: 200 }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{vehicle.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {vehicle.brand} · {vehicle.year}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
                    ${vehicle.price?.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" variant="contained" component={Link} to={`/vehicles/${vehicle.id}`}>
                      View Details
                    </Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => handleRemove(vehicle.id)}>
                      Remove
                    </Button>
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

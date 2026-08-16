// ============================================================
// Login Page
// ============================================================
//
// Allows users to sign in with email and password.
// After successful login, redirects based on role:
//   - Admin → /admin
//   - User  → /dashboard
// ============================================================

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(email, password)
      const defaultDashboard = user.role === 'admin' ? '/admin' : '/dashboard'
      const requestedPath = location.state?.from?.pathname
      const canReturnToRequestedPath = user.role === 'admin'
        ? requestedPath?.startsWith('/admin')
        : requestedPath?.startsWith('/dashboard')

      navigate(canReturnToRequestedPath ? requestedPath : defaultDashboard, { replace: true })
    } catch (err) {
      setError(err.message || 'Failed to login. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 4,
      }}
    >
      <Box className="hero-overlay" sx={{ position: 'absolute', inset: 0 }} />
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Card sx={{ maxWidth: 480, mx: 'auto' }}>
          <CardContent sx={{ p: 4 }}>
            {/* Logo */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <DirectionsCarIcon sx={{ fontSize: 48, color: 'primary.main' }} />
              <Typography variant="h5" sx={{ fontWeight: 800, mt: 1 }}>
                Welcome Back
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Sign in to your AutoDrive account
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><EmailIcon sx={{ color: 'text.secondary' }} /></InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><LockIcon sx={{ color: 'text.secondary' }} /></InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5, mb: 2 }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Box>

            <Divider sx={{ my: 2 }}>or</Divider>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
              <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2', fontSize: '0.875rem' }}>
                Don't have an account? Register
              </Link>
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2', fontSize: '0.875rem' }}>
                Forgot password?
              </Link>
            </Box>

            {/* Demo credentials hint */}
            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="caption">
                <strong>Demo Admin:</strong> admin@autodrive.com / admin123<br />
                <strong>Demo User:</strong> dara@example.com / user123
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

// ============================================================
// User Dashboard - Profile Page
// ============================================================
//
// Shows the user's profile information and allows editing.
// ============================================================

import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Alert,
  Divider,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import { useAuth } from '../../context/AuthContext'

export default function UserProfile() {
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  })
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await updateProfile(formData)
      setEditing(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      alert('Failed to update profile.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className="fade-in">
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        My Profile
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>Profile updated successfully!</Alert>}

      <Grid container spacing={3}>
        {/* Profile summary card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 3 }}>
            <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: 40 }}>
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{user?.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{user?.email}</Typography>
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, mt: 1, display: 'block' }}>
              {user?.role?.toUpperCase()}
            </Typography>
          </Card>
        </Grid>

        {/* Edit profile card */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Profile Information
                </Typography>
                {!editing && (
                  <Button variant="outlined" onClick={() => setEditing(true)}>Edit</Button>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editing}
                    InputProps={{ readOnly: !editing }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    value={user?.email || ''}
                    disabled
                    helperText="Email cannot be changed"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="Enter your phone number"
                  />
                </Grid>
              </Grid>

              {editing && (
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button variant="contained" onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="outlined" onClick={() => { setEditing(false); setFormData({ name: user?.name || '', phone: user?.phone || '' }) }}>
                    Cancel
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

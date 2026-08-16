// ============================================================
// Admin - Vehicle Management (CRUD)
// ============================================================
//
// Admin can:
//   - Create vehicles
//   - Read vehicles
//   - Update vehicles
//   - Delete vehicles
//
// Image flow:
//
// React
//   ↓
// Cloudinary
//   ↓
// Cloudinary image URL
//   ↓
// Firebase Firestore
//   ↓
// vehicle.images[]
//
// Cloudinary stores the actual image.
// Firestore stores the image URL.
// ============================================================

import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Chip,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import LoadingSpinner from "../../components/LoadingSpinner";

import {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "../../services/firestoreService";

import { uploadMultipleImages } from "../../services/cloudinaryService";

// ============================================================
// Constants
// ============================================================

const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];

const TRANSMISSIONS = ["Automatic", "Manual"];

const STATUSES = ["available", "sold", "reserved"];

// ============================================================
// Empty Form
// ============================================================

const emptyForm = {
  name: "",
  brand: "",
  model: "",
  year: "",
  price: "",
  fuelType: "Petrol",
  transmission: "Automatic",
  description: "",
  status: "available",
  features: "",
};

// ============================================================
// Fallback image
// ============================================================

const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/170782/pexels-photo-170782.jpeg?auto=compress&cs=tinysrgb&w=800";

// Firestore may contain legacy string URLs or Cloudinary upload objects.
function getImageUrl(image) {
  if (typeof image === "string") return image;
  if (image && typeof image === "object") return image.url || "";
  return "";
}

// ============================================================
// AdminVehicles Component
// ============================================================

export default function AdminVehicles() {
  // ==========================================================
  // State
  // ==========================================================

  const [vehicles, setVehicles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  // New images selected from computer
  const [images, setImages] = useState([]);

  // Existing Cloudinary images
  const [existingImages, setExistingImages] = useState([]);

  const [saving, setSaving] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  // ==========================================================
  // Get vehicles
  // ==========================================================

  const fetchVehicles = async () => {
    try {
      setLoading(true);

      const data = await getVehicles();

      setVehicles(data);
    } catch (error) {
      console.error("Failed to load vehicles:", error);

      alert(error?.message || "Failed to load vehicles.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // Load vehicles when page opens
  // ==========================================================

  useEffect(() => {
    fetchVehicles();
  }, []);

  // ==========================================================
  // Open Add Dialog
  // ==========================================================

  const handleOpenAdd = () => {
    setForm({
      ...emptyForm,
    });

    setImages([]);

    setExistingImages([]);

    setEditingId(null);

    setDialogOpen(true);
  };

  // ==========================================================
  // Open Edit Dialog
  // ==========================================================

  const handleOpenEdit = (vehicle) => {
    setForm({
      name: vehicle.name || "",
      brand: vehicle.brand || "",
      model: vehicle.model || "",
      year: vehicle.year || "",
      price: vehicle.price || "",
      fuelType: vehicle.fuelType || "Petrol",
      transmission: vehicle.transmission || "Automatic",
      description: vehicle.description || "",
      status: vehicle.status || "available",
      features: Array.isArray(vehicle.features)
        ? vehicle.features.join(", ")
        : vehicle.features || "",
    });

    // Clear newly selected files
    setImages([]);

    // IMPORTANT:
    // Keep existing Cloudinary URLs
    setExistingImages(Array.isArray(vehicle.images) ? vehicle.images : []);

    setEditingId(vehicle.id);

    setDialogOpen(true);
  };

  // ==========================================================
  // Form input change
  // ==========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================================
  // Image selection
  // ==========================================================

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    setImages(selectedFiles);
  };

  // ==========================================================
  // Remove existing image
  // ==========================================================

  const handleRemoveExistingImage = (index) => {
    setExistingImages((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index),
    );
  };

  // ==========================================================
  // Save vehicle
  // ==========================================================

  const handleSave = async () => {
    // Prevent duplicate save
    if (saving) return;

    setSaving(true);

    try {
      // ======================================================
      // 1. Upload new images to Cloudinary
      // ======================================================

      let newImageUrls = [];

      if (images.length > 0) {
        newImageUrls = await uploadMultipleImages(images, "vehicles");
      }

      // ======================================================
      // 2. Parse features
      // ======================================================

      const featuresArray = form.features
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean);

      // ======================================================
      // 3. Combine image URLs
      // ======================================================
      //
      // ADD:
      //   new Cloudinary URLs
      //
      // EDIT:
      //   existing URLs + new URLs
      //
      // ======================================================

      const finalImages = [...existingImages, ...newImageUrls];

      // ======================================================
      // 4. Build vehicle data
      // ======================================================

      const vehicleData = {
        name: form.name.trim(),
        brand: form.brand.trim(),
        model: form.model.trim(),

        year: Number(form.year),

        price: Number(form.price),

        fuelType: form.fuelType,

        transmission: form.transmission,

        description: form.description.trim(),

        status: form.status,

        features: featuresArray,
      };

      // ======================================================
      // IMPORTANT:
      //
      // Always save images as an array.
      //
      // This prevents undefined images.
      // ======================================================

      vehicleData.images = finalImages;

      // ======================================================
      // 5. Add or Update
      // ======================================================

      if (editingId) {
        // UPDATE existing vehicle

        await updateVehicle(editingId, vehicleData);
      } else {
        // ADD new vehicle

        await addVehicle(vehicleData);
      }

      // ======================================================
      // 6. Close dialog
      // ======================================================

      setDialogOpen(false);

      // Reset form
      setForm({
        ...emptyForm,
      });

      setImages([]);

      setExistingImages([]);

      setEditingId(null);

      // ======================================================
      // 7. Reload vehicles
      // ======================================================

      await fetchVehicles();
    } catch (error) {
      console.error("Failed to save vehicle:", error);

      alert("Failed to save vehicle: " + (error?.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // Delete vehicle
  // ==========================================================

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteVehicle(deleteId);

      setDeleteId(null);

      await fetchVehicles();
    } catch (error) {
      console.error("Failed to delete vehicle:", error);

      alert(error?.message || "Failed to delete vehicle.");
    }
  };

  // ==========================================================
  // Loading
  // ==========================================================

  if (loading) {
    return <LoadingSpinner message="Loading vehicles..." />;
  }

  // ==========================================================
  // Render
  // ==========================================================

  return (
    <Box className="fade-in">
      {/* ====================================================
          Header
      ===================================================== */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
          }}
        >
          Vehicle Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
        >
          Add Vehicle
        </Button>
      </Box>

      {/* ====================================================
          Vehicle Cards
      ===================================================== */}

      <Grid container spacing={3}>
        {vehicles.length === 0 ? (
          <Grid item xs={12}>
            <Box
              sx={{
                textAlign: "center",
                py: 8,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No vehicles found.
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Click "Add Vehicle" to create your first vehicle.
              </Typography>
            </Box>
          </Grid>
        ) : (
          vehicles.map((vehicle) => {
            const vehicleImage = getImageUrl(vehicle.images?.[0]) || FALLBACK_IMAGE;

            return (
              <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
                <Card>
                  {/* Vehicle Image */}

                  <CardMedia
                    component="img"
                    image={vehicleImage}
                    alt={vehicle.name || "Vehicle"}
                    sx={{
                      height: 200,
                      objectFit: "cover",
                    }}
                    onError={(event) => {
                      event.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />

                  <CardContent>
                    {/* Name + Status */}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          {vehicle.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                          }}
                        >
                          {vehicle.brand} · {vehicle.year}
                        </Typography>
                      </Box>

                      <Chip
                        label={vehicle.status}
                        color={
                          vehicle.status === "available" ? "success" : "warning"
                        }
                        size="small"
                      />
                    </Box>

                    {/* Price */}

                    <Typography
                      variant="h6"
                      sx={{
                        color: "primary.main",
                        fontWeight: 700,
                        mt: 1,
                        mb: 2,
                      }}
                    >
                      ${Number(vehicle.price || 0).toLocaleString()}
                    </Typography>

                    {/* Buttons */}

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenEdit(vehicle)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setDeleteId(vehicle.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>

      {/* ====================================================
          Add / Edit Dialog
      ===================================================== */}

      <Dialog
        open={dialogOpen}
        onClose={() => {
          if (!saving) {
            setDialogOpen(false);
          }
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingId ? "Edit Vehicle" : "Add New Vehicle"}
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            {/* Vehicle Name */}

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vehicle Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Grid>

            {/* Brand */}

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={form.brand}
                onChange={handleChange}
              />
            </Grid>

            {/* Model */}

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Model"
                name="model"
                value={form.model}
                onChange={handleChange}
              />
            </Grid>

            {/* Year */}

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
              />
            </Grid>

            {/* Price */}

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price ($)"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
            </Grid>

            {/* Fuel Type */}

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Fuel Type</InputLabel>

                <Select
                  name="fuelType"
                  value={form.fuelType}
                  label="Fuel Type"
                  onChange={handleChange}
                >
                  {FUEL_TYPES.map((fuel) => (
                    <MenuItem key={fuel} value={fuel}>
                      {fuel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Transmission */}

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Transmission</InputLabel>

                <Select
                  name="transmission"
                  value={form.transmission}
                  label="Transmission"
                  onChange={handleChange}
                >
                  {TRANSMISSIONS.map((transmission) => (
                    <MenuItem key={transmission} value={transmission}>
                      {transmission}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Status */}

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>

                <Select
                  name="status"
                  value={form.status}
                  label="Status"
                  onChange={handleChange}
                >
                  {STATUSES.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Description */}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={3}
                value={form.description}
                onChange={handleChange}
              />
            </Grid>

            {/* Features */}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Features (comma-separated)"
                name="features"
                value={form.features}
                onChange={handleChange}
                helperText="Example: Sunroof, Leather Seats, Navigation"
              />
            </Grid>

            {/* =================================================
                Existing Cloudinary Images
            ================================================== */}

            {editingId && existingImages.length > 0 && (
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                  }}
                >
                  Existing Images
                </Typography>

                <Grid container spacing={1}>
                  {existingImages.map((image, index) => (
                    <Grid
                      item
                      xs={4}
                      sm={3}
                      key={`${image?.publicId || getImageUrl(image)}-${index}`}
                    >
                      <Box
                        sx={{
                          position: "relative",
                        }}
                      >
                        <Box
                          component="img"
                          src={getImageUrl(image) || FALLBACK_IMAGE}
                          alt={`Vehicle ${index + 1}`}
                          onError={(event) => {
                            event.currentTarget.src = FALLBACK_IMAGE;
                          }}
                          sx={{
                            width: "100%",
                            height: 100,
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                        />

                        <Button
                          size="small"
                          color="error"
                          variant="contained"
                          onClick={() => handleRemoveExistingImage(index)}
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            minWidth: 0,
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            p: 0,
                          }}
                        >
                          ×
                        </Button>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}

            {/* =================================================
                Upload New Images
            ================================================== */}

            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AddIcon />}
              >
                Upload Images
                <input
                  type="file"
                  multiple
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

              {images.length > 0 && (
                <Typography
                  variant="caption"
                  sx={{
                    ml: 2,
                    color: "text.secondary",
                  }}
                >
                  {images.length} image(s) selected
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>

        {/* ==================================================
            Dialog Buttons
        =================================================== */}

        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={saving}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ====================================================
          Delete Confirmation
      ===================================================== */}

      <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Vehicle?</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete this vehicle? This action cannot be
            undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>

          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// ============================================================
// Admin - Service Management (CRUD)
// ============================================================
//
// Admin can create, read, update, and delete services.
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
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  getServices,
  addService,
  updateService,
  deleteService,
} from "../../services/firestoreService";
import { uploadImage } from "../../services/cloudinaryService";

const emptyForm = { title: "", description: "", image: "" };

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchServices = async () => {
    const data = await getServices();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (service) => {
    setForm({
      title: service.title,
      description: service.description,
      image: service.image,
    });
    setImageFile(null);
    setEditingId(service.id);
    setDialogOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let imageUrl = form.image;
      if (imageFile) {
        const uploadedImage = await uploadImage(imageFile, "services");
        imageUrl = uploadedImage.url;
      }

      const serviceData = { ...form, image: imageUrl };

      if (editingId) {
        await updateService(editingId, serviceData);
      } else {
        await addService(serviceData);
      }

      setDialogOpen(false);
      fetchServices();
    } catch (err) {
      alert("Failed to save service: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    await deleteService(deleteId);
    setDeleteId(null);
    fetchServices();
  };

  if (loading) return <LoadingSpinner message="Loading services..." />;

  return (
    <Box className="fade-in">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Service Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
        >
          Add Service
        </Button>
      </Box>

      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card>
              <CardMedia
                component="img"
                image={service.image}
                alt={service.title}
                sx={{ height: 200 }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 2, lineHeight: 1.6 }}
                >
                  {service.description}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenEdit(service)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => setDeleteId(service.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingId ? "Edit Service" : "Add New Service"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              value={form.description}
              onChange={handleChange}
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<AddIcon />}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {imageFile && (
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Selected: {imageFile.name}
              </Typography>
            )}
            {form.image && !imageFile && (
              <Box
                component="img"
                src={form.image}
                alt="Current"
                sx={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Service?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this service?</Typography>
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

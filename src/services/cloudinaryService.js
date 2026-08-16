// ============================================================
// Cloudinary Image Upload Service
// ============================================================

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export async function uploadImage(file, folder = "vehicles") {
  if (!file) {
    throw new Error("No image selected.");
  }

  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary configuration is missing.");
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Image upload failed.");
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
}

// Upload multiple images
export async function uploadMultipleImages(files, folder = "vehicles") {
  if (!files || files.length === 0) {
    return [];
  }

  const uploads = await Promise.all(
    files.map((file) => uploadImage(file, folder)),
  );

  return uploads;
}

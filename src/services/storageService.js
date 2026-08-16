// ============================================================
// Firebase Storage Service
// ============================================================
//
// Handles image uploads to Firebase Storage.
// In mock mode, images are returned as-is (the URL is stored
// directly without uploading). This lets you test the UI flow
// without a real Firebase project.
// ============================================================

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage, isFirebaseConfigured } from '../firebase/config'

/**
 * Upload a single image file to Firebase Storage.
 * @param {File} file - The image file to upload
 * @param {string} folder - The storage folder path (e.g., 'vehicles')
 * @returns {Promise<string>} The download URL of the uploaded image
 */
export async function uploadImage(file, folder = 'vehicles') {
  if (!isFirebaseConfigured) {
    // Mock: convert the file to a data URL so it can be previewed
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Create a unique filename using timestamp
  const filename = `${Date.now()}_${file.name}`
  const storageRef = ref(storage, `${folder}/${filename}`)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

/**
 * Upload multiple image files.
 * @param {File[]} files - Array of image files
 * @param {string} folder - Storage folder path
 * @returns {Promise<string[]>} Array of download URLs
 */
export async function uploadMultipleImages(files, folder = 'vehicles') {
  const uploadPromises = files.map((file) => uploadImage(file, folder))
  return Promise.all(uploadPromises)
}

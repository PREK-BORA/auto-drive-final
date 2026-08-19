
//   Firebase Firestore
//
// Firestore stores the Cloudinary image URLs.
// ============================================================

import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db, isFirebaseConfigured } from "../firebase/config";
import * as mock from "./mockData";

// ============================================================
// VEHICLES
// ============================================================

// ------------------------------------------------------------
// Get all vehicles
// ------------------------------------------------------------
export async function getVehicles() {
  if (!isFirebaseConfigured) {
    return mock.mockGetVehicles();
  }

  const snapshot = await getDocs(collection(db, "vehicles"));

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

// ------------------------------------------------------------
// Get one vehicle by ID
// ------------------------------------------------------------
export async function getVehicleById(id) {
  if (!isFirebaseConfigured) {
    return mock.mockGetVehicleById(id);
  }

  const docRef = doc(db, "vehicles", id);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// ------------------------------------------------------------
// Add vehicle
//
// Images should already be uploaded to Cloudinary.
//
// Example:
//
// images: [
//   "https://res.cloudinary.com/.../car1.jpg",
//   "https://res.cloudinary.com/.../car2.jpg"
// ]
// ------------------------------------------------------------
export async function addVehicle(vehicle) {
  if (!isFirebaseConfigured) {
    return mock.mockAddVehicle(vehicle);
  }

  const vehicleData = {
    ...vehicle,

    // Make sure images is always an array
    images: Array.isArray(vehicle.images) ? vehicle.images : [],

    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "vehicles"), vehicleData);

  return {
    id: docRef.id,
    ...vehicle,
  };
}

// ------------------------------------------------------------
// Update vehicle
//
// Important:
// If images are not included in updates,
// the existing Cloudinary image URLs remain unchanged.
//
// If images are included,
// they replace the current images array.
// ------------------------------------------------------------
export async function updateVehicle(id, updates) {
  if (!isFirebaseConfigured) {
    return mock.mockUpdateVehicle(id, updates);
  }

  const docRef = doc(db, "vehicles", id);

  const updateData = {
    ...updates,
    updatedAt: serverTimestamp(),
  };

  // Do not save undefined fields to Firestore
  Object.keys(updateData).forEach((key) => {
    if (updateData[key] === undefined) {
      delete updateData[key];
    }
  });

  await updateDoc(docRef, updateData);

  return {
    id,
    ...updates,
  };
}

// ------------------------------------------------------------
// Delete vehicle
//
// NOTE:
// This deletes the Firestore document.
//
// It does NOT delete the Cloudinary image.
//
// Cloudinary deletion requires a secure backend/server function.
// ------------------------------------------------------------
export async function deleteVehicle(id) {
  if (!isFirebaseConfigured) {
    return mock.mockDeleteVehicle(id);
  }

  await deleteDoc(doc(db, "vehicles", id));

  return id;
}

// ============================================================
// SERVICES
// ============================================================

// ------------------------------------------------------------
// Get all services
// ------------------------------------------------------------
export async function getServices() {
  if (!isFirebaseConfigured) {
    return mock.mockGetServices();
  }

  const snapshot = await getDocs(collection(db, "services"));

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

// ------------------------------------------------------------
// Add service
// ------------------------------------------------------------
export async function addService(service) {
  if (!isFirebaseConfigured) {
    return mock.mockAddService(service);
  }

  const serviceData = {
    ...service,

    // Service image is also expected to be
    // a Cloudinary URL.
    image: service.image || "",

    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "services"), serviceData);

  return {
    id: docRef.id,
    ...service,
  };
}

// ------------------------------------------------------------
// Update service
// ------------------------------------------------------------
export async function updateService(id, updates) {
  if (!isFirebaseConfigured) {
    return mock.mockUpdateService(id, updates);
  }

  const docRef = doc(db, "services", id);

  const updateData = {
    ...updates,
    updatedAt: serverTimestamp(),
  };

  Object.keys(updateData).forEach((key) => {
    if (updateData[key] === undefined) {
      delete updateData[key];
    }
  });

  await updateDoc(docRef, updateData);

  return {
    id,
    ...updates,
  };
}

// ------------------------------------------------------------
// Delete service
// ------------------------------------------------------------
export async function deleteService(id) {
  if (!isFirebaseConfigured) {
    return mock.mockDeleteService(id);
  }

  await deleteDoc(doc(db, "services", id));

  return id;
}

// ============================================================
// MESSAGES
// ============================================================

// ------------------------------------------------------------
// Add contact message
// ------------------------------------------------------------
export async function addMessage(message) {
  if (!isFirebaseConfigured) {
    return mock.mockAddMessage(message);
  }

  const messageData = {
    ...message,

    read: false,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "messages"), messageData);

  return {
    id: docRef.id,
    ...message,
    read: false,
  };
}

// ------------------------------------------------------------
// Get all messages
// ------------------------------------------------------------
export async function getMessages() {
  if (!isFirebaseConfigured) {
    return mock.mockGetMessages();
  }

  const snapshot = await getDocs(collection(db, "messages"));

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

// ------------------------------------------------------------
// Delete message
// ------------------------------------------------------------
export async function deleteMessage(id) {
  if (!isFirebaseConfigured) {
    return mock.mockDeleteMessage(id);
  }

  await deleteDoc(doc(db, "messages", id));

  return id;
}

// ============================================================
// FAVORITES
// ============================================================

// ------------------------------------------------------------
// Get user's favorites
// ------------------------------------------------------------
export async function getFavorites(userId) {
  if (!userId) {
    return [];
  }

  if (!isFirebaseConfigured) {
    return mock.mockGetFavorites(userId);
  }

  const q = query(collection(db, "favorites"), where("userId", "==", userId));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

// ------------------------------------------------------------
// Add favorite
// ------------------------------------------------------------
export async function addFavorite(userId, vehicleId) {
  if (!userId) {
    throw new Error("User must be logged in.");
  }

  if (!vehicleId) {
    throw new Error("Vehicle ID is required.");
  }

  if (!isFirebaseConfigured) {
    return mock.mockAddFavorite(userId, vehicleId);
  }

  // Check whether the vehicle is already favorited
  const existingQuery = query(
    collection(db, "favorites"),
    where("userId", "==", userId),
    where("vehicleId", "==", vehicleId),
  );

  const existingSnapshot = await getDocs(existingQuery);

  if (!existingSnapshot.empty) {
    return {
      id: existingSnapshot.docs[0].id,
      userId,
      vehicleId,
    };
  }

  const docRef = await addDoc(collection(db, "favorites"), {
    userId,
    vehicleId,
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    userId,
    vehicleId,
  };
}

// ------------------------------------------------------------
// Remove favorite
// ------------------------------------------------------------
export async function removeFavorite(userId, vehicleId) {
  if (!userId) {
    throw new Error("User must be logged in.");
  }

  if (!vehicleId) {
    throw new Error("Vehicle ID is required.");
  }

  if (!isFirebaseConfigured) {
    return mock.mockRemoveFavorite(userId, vehicleId);
  }

  const q = query(
    collection(db, "favorites"),
    where("userId", "==", userId),
    where("vehicleId", "==", vehicleId),
  );

  const snapshot = await getDocs(q);

  const deletePromises = snapshot.docs.map((document) =>
    deleteDoc(document.ref),
  );

  await Promise.all(deletePromises);

  return vehicleId;
}

// ============================================================
// USERS
// ============================================================

// ------------------------------------------------------------
// Get all users
// ------------------------------------------------------------
export async function getUsers() {
  if (!isFirebaseConfigured) {
    return mock.mockGetUsers();
  }

  const snapshot = await getDocs(collection(db, "users"));

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

// ------------------------------------------------------------
// Get user by ID
// ------------------------------------------------------------
export async function getUserById(id) {
  if (!isFirebaseConfigured) {
    const users = await mock.mockGetUsers();

    return users.find((user) => user.id === id || user.uid === id) || null;
  }

  const docRef = doc(db, "users", id);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// ------------------------------------------------------------
// Update user role
// ------------------------------------------------------------
export async function updateUserRole(id, role) {
  if (!isFirebaseConfigured) {
    return mock.mockUpdateUserRole(id, role);
  }

  if (!["admin", "user"].includes(role)) {
    throw new Error("Invalid role. Role must be admin or user.");
  }

  const docRef = doc(db, "users", id);

  await updateDoc(docRef, {
    role,
    updatedAt: serverTimestamp(),
  });

  return {
    id,
    role,
  };
}

// ------------------------------------------------------------
// Delete user document
//
// NOTE:
// This deletes the Firestore profile only.
// It does NOT delete the Firebase Authentication account.
// ------------------------------------------------------------
export async function deleteUser(id) {
  if (!isFirebaseConfigured) {
    return mock.mockDeleteUser(id);
  }

  await deleteDoc(doc(db, "users", id));

  return id;
}

// ============================================================
// DASHBOARD STATISTICS
// ============================================================

export async function getDashboardStats() {
  if (!isFirebaseConfigured) {
    return mock.mockGetStats();
  }

  const [vehiclesSnap, servicesSnap, messagesSnap, usersSnap] =
    await Promise.all([
      getDocs(collection(db, "vehicles")),
      getDocs(collection(db, "services")),
      getDocs(collection(db, "messages")),
      getDocs(collection(db, "users")),
    ]);

  return {
    totalVehicles: vehiclesSnap.size,
    totalServices: servicesSnap.size,
    totalMessages: messagesSnap.size,
    totalUsers: usersSnap.size,
  };
}

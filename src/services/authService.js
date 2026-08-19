

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '../firebase/config'

// ---- Mock auth helpers (when Firebase is not configured) ----
const MOCK_USERS_KEY = 'cdms_mock_auth_users'
const MOCK_CURRENT_KEY = 'cdms_mock_auth_current'

function getMockUsers() {
  const stored = localStorage.getItem(MOCK_USERS_KEY)
  if (stored) return JSON.parse(stored)
  // Seed with an admin and a regular user
  const seed = [
    {
      uid: 'admin1',
      name: 'Admin User',
      email: 'admin@autodrive.com',
      role: 'admin',
      phone: '+885 555-5555',
      password: 'admin123',
      createdAt: new Date().toISOString(),
    },
    {
      uid: 'user1',
      name: 'Da Ra',
      email: 'dara@example.com',
      role: 'user',
      phone: '+885 XXXX XXX',
      password: 'user123',
      createdAt: new Date().toISOString(),
    },
  ]
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(seed))
  return seed
}

function saveMockUsers(users) {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
}

async function getFirebaseUserProfile(firebaseUser) {
  try {
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))

    if (userDoc.exists()) {
      const profile = userDoc.data()
      return {
        uid: firebaseUser.uid,
        ...profile,
        role: profile.role === 'admin' ? 'admin' : 'user',
      }
    }
  } catch (error) {
    console.error('Unable to load the user profile from Firestore.', error)
  }

  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || '',
    email: firebaseUser.email || '',
    role: 'user',
  }
}

// ============================================================
// Register a new user
// ============================================================
export async function registerUser({ name, email, password }) {
  if (!isFirebaseConfigured) {
    // Mock registration
    const users = getMockUsers()
    if (users.find((u) => u.email === email)) {
      throw new Error('This email is already registered.')
    }
    const newUser = {
      uid: `user${Date.now()}`,
      name,
      email,
      role: 'user',
      phone: '',
      password,
      createdAt: new Date().toISOString(),
    }
    users.push(newUser)
    saveMockUsers(users)
    localStorage.setItem(MOCK_CURRENT_KEY, JSON.stringify(newUser))
    return newUser
  }

  // Firebase registration
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(credential.user, { displayName: name })
  // Create a user document in Firestore
  await setDoc(doc(db, 'users', credential.user.uid), {
    name,
    email,
    role: 'user',
    phone: '',
    createdAt: new Date().toISOString(),
  })
  return {
    uid: credential.user.uid,
    name,
    email,
    role: 'user',
    phone: '',
  }
}

// ============================================================
// Login
// ============================================================
export async function loginUser(email, password) {
  if (!isFirebaseConfigured) {
    const users = getMockUsers()
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) throw new Error('Invalid email or password.')
    const { password: _pw, ...safeUser } = user
    localStorage.setItem(MOCK_CURRENT_KEY, JSON.stringify(safeUser))
    return safeUser
  }

  const credential = await signInWithEmailAndPassword(auth, email, password)
  return getFirebaseUserProfile(credential.user)
}

// ============================================================
// Logout
// ============================================================
export async function logoutUser() {
  if (!isFirebaseConfigured) {
    localStorage.removeItem(MOCK_CURRENT_KEY)
    return
  }
  await signOut(auth)
}

// ============================================================
// Send password reset email
// ============================================================
export async function resetPassword(email) {
  if (!isFirebaseConfigured) {
    // Mock: just check if the email exists
    const users = getMockUsers()
    if (!users.find((u) => u.email === email)) {
      throw new Error('No account found with this email.')
    }
    return
  }
  await sendPasswordResetEmail(auth, email)
}

// ============================================================
// Change password (for logged-in users)
// ============================================================
export async function changeUserPassword(newPassword) {
  if (!isFirebaseConfigured) {
    // Mock: update the current user's password
    const current = JSON.parse(localStorage.getItem(MOCK_CURRENT_KEY) || 'null')
    if (!current) throw new Error('Not logged in.')
    const users = getMockUsers()
    const idx = users.findIndex((u) => u.uid === current.uid)
    if (idx !== -1) {
      users[idx].password = newPassword
      saveMockUsers(users)
    }
    return
  }
  const user = auth.currentUser
  if (!user) throw new Error('Not logged in.')
  await updatePassword(user, newPassword)
}

// ============================================================
// Update user profile
// ============================================================
export async function updateUserProfile(userId, { name, phone }) {
  if (!isFirebaseConfigured) {
    const current = JSON.parse(localStorage.getItem(MOCK_CURRENT_KEY) || 'null')
    if (current) {
      current.name = name || current.name
      current.phone = phone || current.phone
      localStorage.setItem(MOCK_CURRENT_KEY, JSON.stringify(current))
    }
    const users = getMockUsers()
    const idx = users.findIndex((u) => u.uid === userId)
    if (idx !== -1) {
      users[idx].name = name || users[idx].name
      users[idx].phone = phone || users[idx].phone
      saveMockUsers(users)
    }
    return current
  }

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: name })
  }
  await updateDoc(doc(db, 'users', userId), { name, phone })
  return { uid: userId, name, phone }
}

// ============================================================
// Subscribe to auth state changes
// ============================================================
export function subscribeToAuthChanges(callback) {
  if (!isFirebaseConfigured) {
    // Mock: check localStorage for a logged-in user
    const current = JSON.parse(localStorage.getItem(MOCK_CURRENT_KEY) || 'null')
    callback(current)
    // Listen for changes (e.g., logout in another tab)
    const handler = () => {
      const c = JSON.parse(localStorage.getItem(MOCK_CURRENT_KEY) || 'null')
      callback(c)
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }

  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      callback(null)
      return
    }
    callback(await getFirebaseUserProfile(firebaseUser))
  })
}

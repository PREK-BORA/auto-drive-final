// ============================================================
// Auth Context
// ============================================================
//
// This file creates a React Context that provides authentication
// state and functions to the entire app.
//
// Any component can use the `useAuth()` hook to:
//   - Access the current user
//   - Register, login, logout
//   - Reset password, change password
//   - Update profile
//
// Context is React's way to share data across components without
// passing props manually at every level ("prop drilling").
// ============================================================

import { createContext, useContext, useEffect, useState } from 'react'
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  changeUserPassword,
  updateUserProfile,
  subscribeToAuthChanges,
} from '../services/authService'

// Create the context
const AuthContext = createContext(null)

// Custom hook: components call `useAuth()` to access the context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Provider component: wraps the app so all children can use useAuth()
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // current logged-in user
  const [loading, setLoading] = useState(true) // true while checking auth state

  // On mount, subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [])

  // ---- Auth functions exposed to the app ----

  const register = async (data) => {
    const newUser = await registerUser(data)
    setUser(newUser)
    return newUser
  }

  const login = async (email, password) => {
    const loggedInUser = await loginUser(email, password)
    setUser(loggedInUser)
    return loggedInUser
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
  }

  const forgotPassword = async (email) => {
    await resetPassword(email)
  }

  const changePassword = async (newPassword) => {
    await changeUserPassword(newPassword)
  }

  const updateProfile = async (data) => {
    const updated = await updateUserProfile(user.uid, data)
    setUser({ ...user, ...updated })
    return updated
  }

  // Helper: check if the current user is an admin
  const isAdmin = user?.role === 'admin'

  // Value object: everything available to components via useAuth()
  const value = {
    user,
    loading,
    isAdmin,
    register,
    login,
    logout,
    forgotPassword,
    changePassword,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

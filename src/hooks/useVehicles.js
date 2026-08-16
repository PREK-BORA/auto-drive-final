// ============================================================
// useVehicles Hook
// ============================================================
//
// A custom React hook that fetches vehicles and provides
// loading state. This is an example of how to extract data
// fetching logic into a reusable hook.
//
// Usage:
//   const { vehicles, loading, error } = useVehicles()
// ============================================================

import { useEffect, useState } from 'react'
import { getVehicles } from '../services/firestoreService'

export function useVehicles() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles()
        setVehicles(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchVehicles()
  }, [])

  return { vehicles, loading, error }
}

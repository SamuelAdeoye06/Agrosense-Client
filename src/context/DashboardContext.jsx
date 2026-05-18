import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'   // ← import AuthContext
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const COOKIE_NAME = 'agrosense_token'

const FarmerContext = createContext(null)

export const FarmerProvider = ({ children }) => {
  const { user } = useAuth()   // ← get real user

  // initialize from real user data instead of hardcoded values
  const [farmerName, setFarmerName] = useState('')
  const [location, setLocation]     = useState('')
  const [savedDates, setSavedDates] = useState([])

  // when user loads or changes, update the farmer state
  useEffect(() => {
    if (user) {
      setFarmerName(user.fullName || '')
      setLocation(user.farmLocation || '')
    }
  }, [user])

  const saveDate     = (dayWithNote) => {
    if (savedDates.find((d) => d.label === dayWithNote.label)) return
    setSavedDates((prev) => [...prev, { ...dayWithNote, id: Date.now() }])
  }
  const deleteDate   = (id)       => setSavedDates((prev) => prev.filter((d) => d.id !== id))
  const updateNote   = (id, note) => setSavedDates((prev) => prev.map((d) => d.id === id ? { ...d, note } : d))
  const isAlreadySaved = (label)  => savedDates.some((d) => d.label === label)

  return (
    <FarmerContext.Provider value={{ farmerName, setFarmerName, location, setLocation, savedDates, saveDate, deleteDate, updateNote, isAlreadySaved }}>
      {children}
    </FarmerContext.Provider>
  )
}

export const useFarmer = () => useContext(FarmerContext)

// ── Admin Context ──
const AdminContext = createContext(null)

export const AdminProvider = ({ children }) => {
  const { user } = useAuth()

  const [users, setUsers]             = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [admins, setAdmins]           = useState([])         // ← start empty
  const [adminsLoading, setAdminsLoading] = useState(false)  // ← add loading
  const [thresholds, setThresholds]           = useState({ rain: 65, humidity: 60, wind: 25, temp_min: 20, temp_max: 35 })
  const [savedThresholds, setSavedThresholds] = useState({ rain: 65, humidity: 60, wind: 25, temp_min: 20, temp_max: 35 })

  const isSuperAdmin = user?.role === 'super_admin'
  const adminName    = user?.fullName || 'Admin'
  const adminEmail   = user?.email || ''

  // fetch both when admin logs in
  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'super_admin')) {
      loadFarmers()
      if (user.role === 'super_admin') loadAdmins()  // only super admin fetches admins
    }
  }, [user])

  const loadFarmers = async () => {
    try {
      setUsersLoading(true)
      const token = cookies.get(COOKIE_NAME)
      const response = await axios.get(
        `${import.meta.env.VITE_DEV_BASE_URL}/api/auth/admin/farmers`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const mapped = response.data.farmers.map((f) => ({
        id:       f._id,
        name:     f.fullName,
        email:    f.email,
        location: f.farmLocation,
        status:   f.status,
        joined:   new Date(f.createdAt).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        }),
        saved: 0,
        avatarUrl: f.avatarUrl,
      }))
      setUsers(mapped)
    } catch (error) {
      console.error('Failed to load farmers:', error.message)
    } finally {
      setUsersLoading(false)
    }
  }

  const loadAdmins = async () => {
    try {
      setAdminsLoading(true)
      const token = cookies.get(COOKIE_NAME)
      const response = await axios.get(
        `${import.meta.env.VITE_DEV_BASE_URL}/api/auth/admin/admins`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const mapped = response.data.admins.map((a) => ({
        id:     a._id,
        name:   a.fullName,
        email:  a.email,
        role:   a.role,
        status: a.status,
        joined: new Date(a.createdAt).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        }),
        avatarUrl: a.avatarUrl,
      }))
      setAdmins(mapped)
    } catch (error) {
      console.error('Failed to load admins:', error.message)
    } finally {
      setAdminsLoading(false)
    }
  }

  const createAdmin = async (adminData) => {
    try {
      const token = cookies.get(COOKIE_NAME)
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_BASE_URL}/api/auth/admin/register`,
        adminData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // reload admins list so new admin appears immediately
      await loadAdmins()
      return { success: true, message: response.data.message }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create admin'
      }
    }
  }

  const deleteFarmer = async (id) => {
    try {
      const token = cookies.get(COOKIE_NAME)

      await axios.delete(
        `${import.meta.env.VITE_DEV_BASE_URL}/api/auth/farmers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setUsers((prev) =>
        prev.filter((u) => u.id !== id)
      )

    } catch (error) {
      console.error(
        'Failed to delete farmer:',
        error.response?.data?.message || error.message
      )
    }
  }

  const deleteAdmin = async (id) => {
    try {
      const token = cookies.get(COOKIE_NAME)

      await axios.delete(
        `${import.meta.env.VITE_DEV_BASE_URL}/api/auth/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setAdmins((prev) =>
        prev.filter((a) => a.id !== id)
      )

    } catch (error) {
      console.error(
        'Failed to delete admin:',
        error.response?.data?.message || error.message
      )
    }
  }

  const toggleFarmerStatus = async (id) => {
      try {
          const token = cookies.get(COOKIE_NAME)
          const response = await axios.patch(
              `${import.meta.env.VITE_DEV_BASE_URL}/api/auth/admin/farmers/${id}/status`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
          )
          // update local state with real status from backend
          setUsers((prev) => prev.map((u) =>
              u.id === id ? { ...u, status: response.data.status } : u
          ))
      } catch (error) {
          console.error('Toggle farmer status error:', error.message)
      }
  }


  const toggleAdminStatus = async (id) => {
      try {
          const token = cookies.get(COOKIE_NAME)
          const response = await axios.patch(
              `${import.meta.env.VITE_DEV_BASE_URL}/api/auth/admin/admins/${id}/status`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
          )
          setAdmins((prev) => prev.map((a) =>
              a.id === id ? { ...a, status: response.data.status } : a
          ))
      } catch (error) {
          console.error('Toggle admin status error:', error.message)
      }
  }

  
  const saveThresholds     = ()   => setSavedThresholds({ ...thresholds })

  return (
    <AdminContext.Provider value={{
      users, usersLoading,
      admins, adminsLoading,
      thresholds, setThresholds, savedThresholds, saveThresholds,
      isSuperAdmin, adminName, adminEmail,
      toggleFarmerStatus, deleteFarmer,
      toggleAdminStatus, deleteAdmin,
      createAdmin, loadFarmers, loadAdmins
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)


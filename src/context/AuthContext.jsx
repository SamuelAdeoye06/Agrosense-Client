import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'
import api from '../api/axios'

const cookies  = new Cookies()
const AuthContext = createContext(null)

const COOKIE_NAME = 'agrosense_token'

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null)
  const [token, setToken]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const navigate  = useNavigate()
  const location  = useLocation()

  useEffect(() => {
    setError(null)
  }, [location.pathname])

  // on app load — restore from cookie
  useEffect(() => {
    const savedToken = cookies.get(COOKIE_NAME)
    const savedUser  = localStorage.getItem('user')

    if (savedToken && savedUser) {
      try {
        const decoded = jwtDecode(savedToken)
        const isExpired = decoded.exp * 1000 < Date.now()

        if (isExpired) {
          // token expired — clear everything
          clearSession()
        } else {
          setToken(savedToken)
          setUser(JSON.parse(savedUser))
        }
      } catch {
        clearSession()
      }
    }
    setLoading(false)
  }, [])

  const saveSession = (data) => {
    // store token in cookie with 7 day expiry
    cookies.set(COOKIE_NAME, data.token, {
      path:    '/',
      maxAge:  60 * 60 * 24 * 7,   // 7 days in seconds
      sameSite: 'lax',
    })
    localStorage.setItem('user', JSON.stringify(data.user))
    setToken(data.token)
    setUser(data.user)
  }

  const clearSession = () => {
    cookies.remove(COOKIE_NAME, { path: '/' })
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const register = async (formData) => {
    try {
      setError(null)
      const { data } = await api.post('/auth/register', formData)
      saveSession(data)
      navigate('/dashboard/overview')
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.'
      setError(message)
      throw new Error(message)
    }
  }

  const login = async (formData) => {
    try {
      setError(null)
      const { data } = await api.post('/auth/login', formData)
      saveSession(data)

      if (data.user.role === 'super_admin' || data.user.role === 'admin') {
        navigate('/admin/overview')
      } else {
        navigate('/dashboard/overview')
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.'
      setError(message)
      throw new Error(message)
    }
  }

  const logout = () => {
    clearSession()
    navigate('/login')
  }

  // update user state after avatar/profile changes
  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  // upload avatar — sends base64 to backend
  const uploadAvatar = async (base64Image, isRetry = false) => {
    try {
      const { data } = await api.post('/auth/upload-avatar', {
        profileImage: base64Image
      })
      updateUser(data.user)
      return { success: true }
    } catch (err) {
      // auto-retry once if it fails on "first try"
      if (!isRetry) {
        console.warn('Avatar upload failed, retrying once...')
        await new Promise(resolve => setTimeout(resolve, 1500)) // wait 1.5s
        return uploadAvatar(base64Image, true)
      }

      return {
        success: false,
        message: err.response?.data?.message || 'Failed to upload image'
      }
    }
  }

  const deleteAccount = async () => {
    try {
      await api.delete('/auth/me')
      clearSession()
      navigate('/login')
    } catch (err) {
      console.error('Failed to delete account:', err.message)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, token, loading, error, setError, 
      register, login, logout, updateUser, uploadAvatar, deleteAccount 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
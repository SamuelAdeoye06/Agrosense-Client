import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const api = axios.create({
  baseURL: `${import.meta.env.VITE_DEV_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// attach token from cookie to every request
api.interceptors.request.use((config) => {
  const token = cookies.get('agrosense_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
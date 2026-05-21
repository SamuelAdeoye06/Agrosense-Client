import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import Landing        from './Pages/Landing'
import Login          from './Pages/Login'
import ForgotPassword from './Pages/ForgotPassword'
import Register       from './Pages/Register'
import NotFound       from './Pages/NotFound'
import AdminLogin     from './Pages/AdminLogin'
import AdminRegister  from './Pages/AdminRegister'

import FarmerLayout      from './Pages/farmer/FarmerLayout'
import FarmerOverview    from './Pages/farmer/FarmerOverview'
import FarmerForecast    from './Pages/farmer/FarmerForecast'
import FarmerSavedDates  from './Pages/farmer/FarmerSavedDates'
import FarmerSettings    from './Pages/farmer/FarmerSettings'

import AdminLayout        from './Pages/admin/AdminLayout'
import AdminOverview      from './Pages/admin/AdminOverview'
import AdminFarmers       from './Pages/admin/AdminFarmers'
import AdminAdmins        from './Pages/admin/AdminAdmins'
import AdminWeatherRules  from './Pages/admin/AdminWeatherRules'
import AdminSettings      from './Pages/admin/AdminSettings'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />

      {/* Redirect already-logged-in users away from auth pages */}
      <Route path="/login" element={
        user
          ? <Navigate to={user.role === 'farmer' ? '/dashboard/overview' : '/admin/overview'} replace />
          : <Login />
      } />
      <Route path="/forgot-password" element={
          user ? <Navigate to={user.role === 'farmer' ? '/dashboard/overview' : '/admin/overview'} replace /> : <ForgotPassword />
      } />
      <Route path="/register" element={
        user
          ? <Navigate to="/dashboard/overview" replace />
          : <Register />
      } />
      <Route path="/admin/login" element={
        user
          ? <Navigate to="/admin/overview" replace />
          : <AdminLogin />
      } />

      {/* Admin register — super admin only */}
      <Route path="/admin/register" element={
        <ProtectedRoute allowedRoles="super_admin">
          <AdminRegister />
        </ProtectedRoute>
      } />

      {/* Farmer Dashboard */}
      <Route path="/dashboard" element={<FarmerLayout />}>
        <Route index           element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<FarmerOverview />} />
        <Route path="forecast" element={<FarmerForecast />} />
        <Route path="saved"    element={<FarmerSavedDates />} />
        <Route path="settings" element={<FarmerSettings />} />
      </Route>

      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index                element={<Navigate to="overview" replace />} />
        <Route path="overview"      element={<AdminOverview />} />
        <Route path="farmers"       element={<AdminFarmers />} />
        <Route path="admins"        element={<AdminAdmins />} />
        <Route path="weather-rules" element={<AdminWeatherRules />} />
        <Route path="settings"      element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
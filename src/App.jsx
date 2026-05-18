// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Landing from './Pages/Landing'
// import Login from './Pages/Login'
// import Register from './Pages/Register'
// import NotFound from './Pages/NotFound'
// import FarmerDashboard from './Pages/FarmerDashboard'
// import AdminDashboard from './Pages/AdminDashboard'
// import AdminLogin from './Pages/AdminLogin'
// import AdminRegister from './Pages/AdminRegister'

// const App = () => {
//   return (
//     <div>
//       <Routes>
//         <Route path='/' element={<Landing/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/admin/login' element={<AdminLogin/>}/>
//         <Route path='/as-admin/register' element={<AdminRegister/>}/>
//         <Route path='/register' element={<Register/>}/>
//         <Route path='/dashboard' element={<FarmerDashboard/>}/>
//         <Route path='/admin' element={<AdminDashboard/>}/>

//         <Route path='*' element={<NotFound/>}/>
//       </Routes>
//     </div>
//   )
// }

// export default App

import { Routes, Route, Navigate } from 'react-router-dom'

import Landing        from './Pages/Landing'
import Login          from './Pages/Login'
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
import AdminSettings from './Pages/admin/AdminSettings'

function App() {
  return (
    <Routes>
        {/* Public */}
      <Route path="/"         element={<Landing />} />
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

        {/* Admin auth */}
      <Route path="/admin/login"    element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />

        {/* Farmer Dashboard — nested */}
      <Route path="/dashboard" element={<FarmerLayout />}>
        <Route index             element={<Navigate to="overview" replace />} />
        <Route path="overview"   element={<FarmerOverview />} />
        <Route path="forecast"   element={<FarmerForecast />} />
        <Route path="saved"      element={<FarmerSavedDates />} />
        <Route path="settings"   element={<FarmerSettings />} />
      </Route>

        {/* Admin Dashboard — nested */}
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
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFarmer } from '../../context/DashboardContext'
import { useAuth } from '../../context/AuthContext'
import ProfileImageModal from '../../components/ProfileImageModal'
import api from '../../api/axios'
import './FarmerSettings.css'

const FarmerSettings = () => {
  const { farmerName, setFarmerName, location, setLocation, savedDates } = useFarmer()
  const { user, logout, deleteAccount } = useAuth()
  const navigate = useNavigate()

  const [showAvatarModal, setShowAvatarModal] = useState(false)
  const [editingName, setEditingName]         = useState(false)
  const [tempName, setTempName]               = useState(farmerName)
  const [nameSaved, setNameSaved]             = useState(false)
  const [editingLocation, setEditingLocation] = useState(false)
  const [tempLocation, setTempLocation]       = useState(location)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Password change state
  const [showPasswordForm, setShowPasswordForm]   = useState(false)
  const [passwordData, setPasswordData]           = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [showCurrent, setShowCurrent]             = useState(false)
  const [showNew, setShowNew]                     = useState(false)
  const [showConfirm, setShowConfirm]             = useState(false)
  const [passwordLoading, setPasswordLoading]     = useState(false)
  const [passwordError, setPasswordError]         = useState(null)
  const [passwordSuccess, setPasswordSuccess]     = useState(false)

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
    setPasswordError(null)
  }

  const handlePasswordSubmit = async () => {
    setPasswordError(null)

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      return setPasswordError('All password fields are required')
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setPasswordError('New passwords do not match')
    }
    if (passwordData.newPassword.length < 8) {
      return setPasswordError('New password must be at least 8 characters')
    }

    try {
      setPasswordLoading(true)
      await api.patch('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })
      setPasswordSuccess(true)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setShowPasswordForm(false)
      setTimeout(() => setPasswordSuccess(false), 3000)
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to change password')
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleNameSave = () => {
    if (!tempName.trim()) return
    setFarmerName(tempName)
    setEditingName(false)
    setNameSaved(true)
    setTimeout(() => setNameSaved(false), 2500)
  }

  const handleLocationSave = () => {
    setLocation(tempLocation)
    setEditingLocation(false)
  }

  const handleLogout = () => logout()

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount()
    } catch (err) {
      console.error("Failed to delete account:", err)
    }
  }

  return (
    <div className="farmer-settings-container">
      <div className="as-section-header mb-4">
        <div className="as-header-line" />
        <h5 className="as-section-title">Settings</h5>
      </div>

      <div className="as-card farmer-profile-card p-4 mb-4">
        <div className="farmer-header-banner"></div>
        <div className="d-flex flex-column flex-md-row align-items-center gap-4 farmer-profile-content">
          <div className="position-relative">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={farmerName} className="as-avatar farmer-avatar-image" />
            ) : (
              <div className="as-avatar-placeholder farmer-avatar-placeholder-large">
                {farmerName?.[0] || 'F'}
              </div>
            )}
            <button onClick={() => setShowAvatarModal(true)} className="as-btn farmer-avatar-edit-btn" title="Edit Profile Picture">
              <i className="bi bi-camera-fill avatar-edit-icon"></i>
            </button>
          </div>
          <div className="text-center text-md-start">
            <h4 className="as-text-primary farmer-name-display m-0">{farmerName}</h4>
            <p className="as-text-soft m-0 mt-1 farmer-location-sub">
              <i className="bi bi-geo-alt me-1"></i>{location}
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="as-card">
            <h6 className="as-text-primary fw-bold mb-3">
              <i className="bi bi-person me-2 as-text-primary"></i>Personal Info
            </h6>
            <div className="mb-3">
              <label className="as-label">Full Name</label>
              {editingName ? (
                <div>
                  <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} className="as-input mb-2" />
                  <div className="d-flex gap-2">
                    <button onClick={handleNameSave} className="as-btn as-btn-primary btn-sm px-3 py-1">Save</button>
                    <button onClick={() => setEditingName(false)} className="as-btn as-btn-outline btn-sm px-3 py-1">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <span className="as-text-primary fw-bold">{farmerName}</span>
                  <button onClick={() => setEditingName(true)} className="btn btn-sm p-0 as-text-primary"><i className="bi bi-pencil"></i></button>
                </div>
              )}
            </div>
            <div>
              <label className="as-label">Email Address</label>
              <div className="as-input farmer-input-readonly">
                <i className="bi bi-lock me-2"></i>{user?.email}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="as-card">
            <h6 className="as-text-primary fw-bold mb-3">
              <i className="bi bi-geo-alt me-2 as-text-primary"></i>Farm Location
            </h6>
            {editingLocation ? (
              <div>
                <input type="text" value={tempLocation} onChange={(e) => setTempLocation(e.target.value)} className="as-input mb-3" />
                <div className="d-flex gap-2">
                  <button onClick={handleLocationSave} className="as-btn as-btn-primary btn-sm px-3 py-1">Save</button>
                  <button onClick={() => setEditingLocation(false)} className="as-btn as-btn-outline btn-sm px-3 py-1">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <span className="as-text-accent fw-bold">📍 {location}</span>
                <button onClick={() => setEditingLocation(true)} className="btn btn-sm p-0 as-text-primary"><i className="bi bi-pencil"></i></button>
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="as-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="as-text-primary fw-bold m-0">
                <i className="bi bi-key me-2 as-text-primary"></i>Change Password
              </h6>
              {!showPasswordForm && (
                <button onClick={() => setShowPasswordForm(true)} className="as-btn as-btn-outline btn-sm px-3 farmer-btn-status-small">
                  <i className="bi bi-pencil me-1"></i>Change
                </button>
              )}
            </div>
            {passwordSuccess && (
              <div className="as-badge-active p-2 rounded mb-3 success-banner">
                <i className="bi bi-check-circle me-2"></i>Password changed successfully!
              </div>
            )}
            {!showPasswordForm ? (
              <p className="as-text-soft m-0 success-banner">Secure your account by updating your password regularly.</p>
            ) : (
              <div>
                {passwordError && (
                  <div className="as-badge-inactive p-2 rounded mb-3 error-banner">
                    <i className="bi bi-exclamation-circle me-2"></i>{passwordError}
                  </div>
                )}
                <div className="mb-3">
                  <label className="as-label">Current Password</label>
                  <div className="farmer-password-input-wrapper">
                    <input type={showCurrent ? 'text' : 'password'} name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} className="as-input farmer-password-input" />
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="btn farmer-password-toggle">
                      <i className={showCurrent ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'}></i>
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="as-label">New Password</label>
                  <div className="farmer-password-input-wrapper">
                    <input type={showNew ? 'text' : 'password'} name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="as-input farmer-password-input" />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="btn farmer-password-toggle">
                      <i className={showNew ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'}></i>
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="as-label">Confirm Password</label>
                  <div className="farmer-password-input-wrapper">
                    <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="as-input farmer-password-input" />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="btn farmer-password-toggle">
                      <i className={showConfirm ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'}></i>
                    </button>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button onClick={handlePasswordSubmit} disabled={passwordLoading} className="as-btn as-btn-primary flex-grow-1 py-2">
                    {passwordLoading ? 'Saving...' : 'Save Password'}
                  </button>
                  <button onClick={() => setShowPasswordForm(false)} className="as-btn as-btn-outline px-3 py-2">Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="as-card">
            <h6 className="as-text-primary fw-bold mb-3">
              <i className="bi bi-shield me-2 as-text-primary"></i>Account Actions
            </h6>
            <div className="d-flex flex-column gap-2">
              <button onClick={handleLogout} className="as-btn as-btn-outline w-100 py-2 justify-content-start farmer-logout-btn">
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </button>
              <button onClick={() => setShowDeleteModal(true)} className="as-btn as-btn-danger w-100 py-2 justify-content-start">
                <i className="bi bi-trash3 me-2"></i>Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="farmer-delete-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="as-card farmer-delete-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-4">
              <div className="delete-alert-icon-wrapper">🗑️</div>
              <h5 className="as-text-primary fw-bold mb-2">Delete Your Account?</h5>
              <p className="as-text-soft m-0 delete-modal-text-desc">This cannot be undone. All your data will be permanently lost.</p>
            </div>
            <div className="d-flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="as-btn as-btn-outline flex-grow-1 py-2">Cancel</button>
              <button onClick={handleDeleteAccount} className="as-btn flex-grow-1 py-2 confirm-delete-account-btn">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showAvatarModal && <ProfileImageModal currentName={farmerName} onClose={() => setShowAvatarModal(false)} />}
    </div>
  )
}

export default FarmerSettings
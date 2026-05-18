import { useState } from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useAuth } from '../context/AuthContext'
import './Login.css'

// strong password regex: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/

const registerSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(4, 'Name must be at least 4 characters')
    .required('Full name is required'),
  email: Yup.string()
    .trim()
    .email('Enter a valid email address')
    .required('Email is required'),
  farmLocation: Yup.string()
    .trim()
    .min(3, 'Please enter a valid location')
    .required('Farm location is required'),
  password: Yup.string()
    .matches(
      passwordRegex,
      'Password must be at least 8 characters and include uppercase, lowercase, number and special character (@$!%*?&_#)'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
})

const Register = () => {
  const { register, error, setError } = useAuth()
  const [loading, setLoading]           = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false)

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      farmLocation: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setError(null)
      setLoading(true)
      try {
        await register({
          fullName:     values.fullName.trim(),
          email:        values.email.trim(),
          password:     values.password,
          farmLocation: values.farmLocation.trim(),
        })
      } catch {
        // error already set in AuthContext
      } finally {
        setLoading(false)
      }
    },
  })

  const handleFieldChange = (e) => {
    if (error) setError(null)
    formik.handleChange(e)
  }

  const getFieldError   = (field) => formik.touched[field] && formik.errors[field]
  const passwordsMatch    = formik.touched.confirmPassword && formik.values.confirmPassword && formik.values.confirmPassword === formik.values.password
  const passwordsMismatch = getFieldError('confirmPassword')

  return (
    <div className="auth-page-container">

      {/* ── LEFT PANEL ── */}
      <div className="d-none d-lg-flex flex-column justify-content-between auth-left-panel">
        <div className="auth-circle-1" />
        <div className="auth-circle-2" />

        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none position-relative z-1">
          <div className="auth-logo-box">🌱</div>
          <span className="auth-logo-text">AgroSense</span>
        </Link>

        <div className="position-relative z-1">
          <div className="auth-welcome-icon">🌱</div>
          <h2 className="auth-welcome-title">
            Start farming<br />
            <span className="auth-welcome-accent">smarter today.</span>
          </h2>
          <p className="auth-welcome-desc">
            Join farmers using AgroSense to plan better planting seasons with accurate weather forecasts.
          </p>
          <div className="mt-4 d-flex flex-column gap-3">
            {[
              '7-day weather forecasts for your farm',
              'Save and plan your best farming dates',
              'Add personal notes to each saved date',
              'Update your farm location anytime',
            ].map((item) => (
              <div key={item} className="d-flex align-items-start gap-3">
                <div className="auth-logo-box bg-opacity-25 border-opacity-50 mt-1" style={{ width: 24, height: 24 }}>
                  <i className="bi bi-check fs-6 text-success"></i>
                </div>
                <span className="auth-quote-text italic-normal text-success opacity-75">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="position-relative z-1">
          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="as-text-primary fw-bold text-decoration-none">Sign in here</Link>
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="auth-right-panel">

        <div className="d-flex d-lg-none auth-mobile-header">
          <span className="fs-4">🌱</span>
          <span className="auth-logo-text">AgroSense</span>
        </div>

        <div className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
          <div className="auth-form-wrapper">

            <div className="mb-4">
              <h3 className="auth-form-title">Create Account</h3>
              <p className="auth-form-subtitle">
                Already registered?{' '}
                <Link to="/login" className="as-text-accent fw-bold text-decoration-none">Sign in</Link>
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} noValidate>

              {/* Full Name */}
              <div className="mb-3">
                <label className="auth-label">Full Name</label>
                <div className="auth-input-wrapper">
                  <i className="bi bi-person auth-input-icon"></i>
                  <input
                    type="text"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={handleFieldChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g. Emeka Obi"
                    className={`form-control auth-input-field ${getFieldError('fullName') ? 'auth-input-field-error' : 'auth-input-field-normal'}`}
                  />
                </div>
                {getFieldError('fullName') && (
                  <p className="auth-error-text">
                    <i className="bi bi-exclamation-circle me-1"></i>{formik.errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrapper">
                  <i className="bi bi-envelope auth-input-icon"></i>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={handleFieldChange}
                    onBlur={formik.handleBlur}
                    placeholder="you@example.com"
                    className={`form-control auth-input-field ${getFieldError('email') ? 'auth-input-field-error' : 'auth-input-field-normal'}`}
                  />
                </div>
                {getFieldError('email') && (
                  <p className="auth-error-text">
                    <i className="bi bi-exclamation-circle me-1"></i>{formik.errors.email}
                  </p>
                )}
              </div>

              {/* Farm Location */}
              <div className="mb-3">
                <label className="auth-label">
                  Farm Location
                  <span className="as-text-soft fs-7 fw-normal ms-2">(you can update this later)</span>
                </label>
                <div className="auth-input-wrapper">
                  <i className="bi bi-geo-alt auth-input-icon"></i>
                  <input
                    type="text"
                    name="farmLocation"
                    value={formik.values.farmLocation}
                    onChange={handleFieldChange}
                    onBlur={formik.handleBlur}
                    placeholder="e.g. Ibadan, Oyo State"
                    className={`form-control auth-input-field ${getFieldError('farmLocation') ? 'auth-input-field-error' : 'auth-input-field-normal'}`}
                  />
                </div>
                {getFieldError('farmLocation') && (
                  <p className="auth-error-text">
                    <i className="bi bi-exclamation-circle me-1"></i>{formik.errors.farmLocation}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrapper">
                  <i className="bi bi-lock auth-input-icon"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formik.values.password}
                    onChange={handleFieldChange}
                    onBlur={formik.handleBlur}
                    placeholder="Create a strong password"
                    className={`form-control auth-input-field ${getFieldError('password') ? 'auth-input-field-error' : 'auth-input-field-normal'}`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="auth-pass-toggle">
                    <i className={showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'}></i>
                  </button>
                </div>
                <p className={`auth-error-text ${getFieldError('password') ? '' : 'as-text-primary'}`}>
                  {getFieldError('password')
                    ? <><i className="bi bi-exclamation-circle me-1"></i>{formik.errors.password}</>
                    : <>Min 8 chars · uppercase · lowercase · number · special character (@$!%*?&_#)</>
                  }
                </p>
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="auth-label">Confirm Password</label>
                <div className="auth-input-wrapper">
                  <i className="bi bi-lock-fill auth-input-icon"></i>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={handleFieldChange}
                    onBlur={formik.handleBlur}
                    placeholder="Repeat your password"
                    className={`form-control auth-input-field ${passwordsMismatch ? 'auth-input-field-error' : passwordsMatch ? 'border-success' : 'auth-input-field-normal'}`}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="auth-pass-toggle">
                    <i className={showConfirm ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'}></i>
                  </button>
                </div>
                {passwordsMismatch && (
                  <p className="auth-error-text">
                    <i className="bi bi-exclamation-circle me-1"></i>{formik.errors.confirmPassword}
                  </p>
                )}
                {passwordsMatch && (
                  <p className="as-text-primary fs-7 mt-1">
                    <i className="bi bi-check-circle me-1"></i>Passwords match
                  </p>
                )}
              </div>

              {/* API error */}
              {error && (
                <div className="auth-api-error-box">
                  <p className="auth-error-text m-0">
                    <i className="bi bi-exclamation-circle me-2"></i>{error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn w-100 py-3 auth-submit-btn"
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading
                  ? <><span className="spinner-border spinner-border-sm me-2"></span>Creating account...</>
                  : <>Create My Account &nbsp;<i className="bi bi-arrow-right"></i></>
                }
              </button>
            </form>
          </div>
        </div>

        <div className="text-center pb-4">
          <p className="auth-footer-text">© 2026 AgroSense. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Register
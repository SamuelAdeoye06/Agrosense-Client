import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

const NotFound = () => {
  return (
    <div className="auth-page-container flex-column align-items-center justify-content-center text-center p-4">

      {/* Background blobs */}
      <div className="auth-circle-1 notfound-blob-1" />
      <div className="auth-circle-2 notfound-blob-2" />
      <div className="auth-circle-3 notfound-blob-3" />

      {/* Logo top */}
      <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none position-absolute top-0 start-0 m-4">
        <div className="auth-logo-box notfound-logo-box">🌱</div>
        <span className="auth-logo-text fs-6">AgroSense</span>
      </Link>

      {/* Main content */}
      <div className="position-relative z-1 notfound-content-wrapper">

        {/* Big illustration */}
        <div className="fs-1 mb-2">🌾</div>

        {/* 404 number */}
        <h1 className="display-1 fw-bold mb-3 notfound-404-text">
          404
        </h1>

        {/* Thin divider line */}
        <div className="as-header-line mx-auto mb-4 notfound-divider" />

        <h2 className="auth-welcome-title fs-3 mb-3">
          Looks like this field is empty
        </h2>

        <p className="auth-welcome-desc mx-auto mb-5 notfound-desc">
          The page you're looking for doesn't exist or may have been moved. Let's get you back to your farm dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link to="/" className="btn px-5 py-3 auth-submit-btn rounded-pill">
            <i className="bi bi-house me-2"></i>Back to Home
          </Link>

          <Link to="/login" className="btn px-5 py-3 as-btn-outline rounded-pill text-success border-success">
            <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
          </Link>
        </div>

        {/* Help text */}
        <p className="as-text-soft fs-7 mt-5">
          If you think this is a mistake, please{' '}
          <a href="#" className="as-text-primary text-decoration-none fw-bold">
            contact support
          </a>
        </p>

      </div>

      {/* Bottom strip */}
      <div className="position-absolute bottom-0 mb-4">
        <p className="as-text-dark fs-7 opacity-50 m-0">
          © 2026 AgroSense. All rights reserved.
        </p>
      </div>

    </div>
  )
}

export default NotFound
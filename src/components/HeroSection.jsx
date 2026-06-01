import { Link } from 'react-router-dom'
import './HeroSection.css'

const HeroSection = () => {
  const stats = [
    { value: '8', label: 'Farm Activities' },
    { value: '4', label: 'Condition Labels' },
    { value: '3hr', label: 'Weather Cache' },
  ]

  return (
    <section className="hero-wrapper">
      <div className="container position-relative">
        <div className="row align-items-center gy-5 hero-content-row">

          {/* Left: Text — centered on mobile, left-aligned on desktop */}
          <div className="col-lg-6 text-center text-lg-start hero-copy">
            <span className="badge mb-3 px-3 py-2 hero-badge">
              🌾 Farming decisions from live weather rules
            </span>

            <h1 className="hero-title">
              Know what farm work is{' '}
              <span className="hero-title-accent">
                safe today
              </span>{' '}
              before you step into the field
            </h1>

            <p className="hero-desc mx-auto mx-lg-0">
              AgroSense turns your farm location, crop profile, and 7-day weather forecast into clear recommendations for planting, harvesting, spraying, irrigation, weeding, tillage, fertilizing, and pruning.
            </p>

            {/* Buttons — centered on mobile */}
            <div className="hero-actions">
              <Link to="/register" className="btn hero-btn-primary">
                Start Free Today →
              </Link>
              <a href="#features" className="btn hero-btn-secondary">
                Explore the System
              </a>
            </div>

            {/* Stats — centered on mobile */}
            <div className="hero-stats">
              {stats.map((stat) => (
                <div className="hero-stat" key={stat.label}>
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="col-lg-6 d-flex justify-content-center justify-content-lg-end">
            <div className="hero-screenshot-frame">
              <div className="hero-screenshot-topbar">
                <div className="hero-window-dots" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="hero-live-pill">Real farmer dashboard</span>
              </div>
              <picture>
                <source media="(max-width: 767px)" srcSet="/landing-dashboard-mobile.png" />
                <img
                  className="hero-dashboard-shot"
                  src="/landing-dashboard-desktop.png"
                  alt="AgroSense farmer dashboard showing weather cards, condition status, forecast, and saved dates"
                />
              </picture>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection

import { Link } from 'react-router-dom'
import './HeroSection.css'

const HeroSection = () => {
  return (
    <section className="hero-wrapper">

      <div className="hero-blob-1" />
      <div className="hero-blob-2" />

      <div className="container position-relative">
        <div className="row align-items-center gy-5">

          {/* Left: Text — centered on mobile, left-aligned on desktop */}
          <div className="col-lg-6 text-center text-lg-start">
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
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mb-5">
              <Link to="/register" className="btn px-5 py-3 hero-btn-primary">
                Start Free Today →
              </Link>
              <a href="#features" className="btn px-5 py-3 hero-btn-secondary">
                Explore the System
              </a>
            </div>

            {/* Stats — centered on mobile */}
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-4">
              {[{ value: '8', label: 'Farm Activities' }, { value: '4', label: 'Condition Labels' }, { value: '3hr', label: 'Weather Cache' }].map((stat) => (
                <div key={stat.label}>
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="col-lg-6 d-flex justify-content-center">
            <div className="hero-mockup-card">

              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <div className="mockup-location">📍 My Farm Location</div>
                  <div className="mockup-temp">28°C</div>
                  <div className="mockup-condition">Suitable for planting 🌱</div>
                </div>
                <span className="mockup-emoji-large">🌤</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                {[{ day: 'Mon', icon: '✅', temp: 'Optimal' }, { day: 'Tue', icon: '⚠️', temp: 'Restr.' }, { day: 'Wed', icon: '⛅', temp: 'Suit.' }, { day: 'Thu', icon: '✅', temp: 'Optimal' }, { day: 'Fri', icon: '⛔', temp: 'Unsafe' }].map((d) => (
                  <div key={d.day} className="mockup-forecast-item">
                    <div className="mockup-day">{d.day}</div>
                    <div className="mockup-icon">{d.icon}</div>
                    <div className="mockup-temp-small">{d.temp}</div>
                  </div>
                ))}
              </div>

              <div className="mockup-saved-banner">
                <div>
                  <div className="mockup-saved-tag">📋 TODAY'S ACTIVITIES</div>
                  <div className="mockup-saved-desc">Planting · Weeding · Fertilizing</div>
                </div>
                <span className="fs-3">📅</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection

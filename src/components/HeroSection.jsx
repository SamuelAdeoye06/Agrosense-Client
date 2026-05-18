import React from 'react'
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
              🌾 Weather Intelligence for Farmers
            </span>

            <h1 className="hero-title">
              Farm Smarter with{' '}
              <span className="hero-title-accent">
                Real-Time
              </span>{' '}
              Weather Insights
            </h1>

            <p className="hero-desc mx-auto mx-lg-0">
              Get precise 7-day forecasts, save your best farming dates, and make confident decisions — all from one dashboard built for farmers.
            </p>

            {/* Buttons — centered on mobile */}
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mb-5">
              <Link to="/register" className="btn px-5 py-3 hero-btn-primary">
                Start Free Today →
              </Link>
              <a href="#features" className="btn px-5 py-3 hero-btn-secondary">
                See How It Works
              </a>
            </div>

            {/* Stats — centered on mobile */}
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-4">
              {[{ value: '7-Day', label: 'Forecast' }, { value: '5+', label: 'Data Points' }, { value: 'Free', label: 'To Start' }].map((stat) => (
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
                  <div className="mockup-condition">Partly Cloudy ⛅</div>
                </div>
                <span className="mockup-emoji-large">🌤</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                {[{ day: 'Mon', icon: '☀️', temp: '30°' }, { day: 'Tue', icon: '🌧', temp: '24°' }, { day: 'Wed', icon: '⛅', temp: '27°' }, { day: 'Thu', icon: '☀️', temp: '31°' }, { day: 'Fri', icon: '🌩', temp: '22°' }].map((d) => (
                  <div key={d.day} className="mockup-forecast-item">
                    <div className="mockup-day">{d.day}</div>
                    <div className="mockup-icon">{d.icon}</div>
                    <div className="mockup-temp-small">{d.temp}</div>
                  </div>
                ))}
              </div>

              <div className="mockup-saved-banner">
                <div>
                  <div className="mockup-saved-tag">✅ SAVED FAVORABLE DATE</div>
                  <div className="mockup-saved-desc">Thursday — Good for planting</div>
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
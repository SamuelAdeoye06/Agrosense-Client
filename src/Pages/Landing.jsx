import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import FeatureCard from '../components/FeatureCard'
import './Landing.css'

const features = [
  { icon: '🌦', title: '7-Day Weather Forecast', description: 'Daily breakdowns of temperature, humidity, rainfall chance, and wind speed — tailored to your exact farm location.', accent: true },
  { icon: '📍', title: 'Farm Location Profile', description: 'Save your farm location and update it anytime. Your forecast is always specific to your land.' },
  { icon: '📅', title: 'Save Favorable Dates', description: 'Spot the best weather windows and save those dates to your personal calendar instantly.', accent: true },
  { icon: '📝', title: 'Personal Notes', description: 'Attach notes to any saved date — plan what to plant, track what you did, stay organised.' },
  { icon: '📊', title: 'Smart Dashboard', description: "See today's weather and all your saved upcoming dates together in one clean view.", accent: true },
  { icon: '🔐', title: 'Secure Farmer Accounts', description: 'Register and login securely. Your farm data, calendar, and notes are private to you.' },
]

const steps = [
  { number: '01', title: 'Create Your Account', desc: 'Register in seconds and set up your farmer profile.' },
  { number: '02', title: 'Save Your Farm Location', desc: 'Pin your farm so forecasts are always accurate for your land.' },
  { number: '03', title: 'Check Your Forecast', desc: 'View 7 days of weather — temperature, rain, humidity, wind.' },
  { number: '04', title: 'Save & Plan', desc: 'Bookmark great farming days, add notes, and plan your season with confidence.' },
]

const Landing = () => {
  return (
    <div className="landing-wrapper">

      <Navbar />
      <HeroSection />

      {/* ── Features ── */}
      <section id="features" className="landing-section-dark">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge mb-3 px-3 py-2 landing-badge">
              What's Inside
            </span>
            <h2 className="landing-title">
              Everything a Farmer Needs
            </h2>
            <p className="landing-subtitle">
              Built for the realities of farming — not just a generic weather app.
            </p>
          </div>

          <div className="row g-4">
            {features.map((f) => (
              <div className="col-md-6 col-lg-4" key={f.title}>
                <FeatureCard {...f} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="landing-section-black">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="landing-title">
              How AgroSense Works
            </h2>
            <p className="landing-subtitle mx-auto landing-subtitle-constrained">
              Four simple steps to smarter farming decisions.
            </p>
          </div>

          <div className="row g-4">
            {steps.map((step) => (
              <div className="col-sm-6 col-lg-3" key={step.number}>
                <div className="text-center step-card">
                  <div className="step-number">
                    {step.number}
                  </div>
                  <h5 className="step-title">{step.title}</h5>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="landing-cta-banner">
        <div className="container">
          <span className="cta-emoji">🌾</span>
          <h2 className="landing-title mt-3 mb-2">
            Ready to Farm Smarter?
          </h2>
          <p className="cta-desc">
            Sign up today and start making weather-informed farming decisions.
          </p>
          <Link to="/register" className="btn px-5 py-3 cta-btn-large">
            Create Free Account →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Landing
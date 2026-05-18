import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFarmer } from '../../context/DashboardContext'
import './FarmerOverview.css'

const forecast = [
  { label: 'Monday', day: 'Mon', icon: '🌧', temp: '24°C', rain: 72, good: true  },
  { label: 'Tuesday',day: 'Tue', icon: '☀️', temp: '31°C', rain: 8,  good: false },
  { label: 'Wednesday',day:'Wed',icon: '⛅', temp: '27°C', rain: 55, good: true  },
  { label: 'Thursday',day:'Thu', icon: '☀️', temp: '33°C', rain: 5,  good: false },
  { label: 'Friday',  day: 'Fri',icon: '🌦', temp: '26°C', rain: 68, good: true  },
]

const FarmerOverview = () => {
  const { location, savedDates, deleteDate, isAlreadySaved } = useFarmer()
  const navigate = useNavigate()

  return (
    <>
      <div className="as-section-header mb-3">
        <div className="as-header-line" />
        <h6 className="as-text-primary fw-bold m-0 stat-label-small">Today's Weather Forecast</h6>
        <span className="as-badge as-badge-active ms-2">{location}</span>
      </div>

      <div className="row g-3 mb-4">
        {[
          { icon: '🌡', label: 'Temperature', value: '28°C',    sub: 'Feels like 30°C',      color: '#ff8c42' },
          { icon: '🌧', label: 'Rain Chance', value: '70%',     sub: 'Likely to rain today', color: 'var(--as-primary-green)' },
          { icon: '💧', label: 'Humidity',    value: '75%',     sub: 'High moisture levels', color: '#4db6e4' },
          { icon: '💨', label: 'Wind Speed',  value: '12 km/h', sub: 'Moderate breeze',      color: '#a78bfa' },
        ].map((stat) => (
          <div className="col-6 col-lg-3" key={stat.label}>
            <div className="as-card">
              <div className="stat-icon-large">{stat.icon}</div>
              <div className="stat-value-large" style={{ color: stat.color }}>{stat.value}</div>
              <div className="as-text-primary fw-bold mt-2 stat-label-small">{stat.label}</div>
              <div className="as-text-soft stat-sub-text">{stat.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 p-4 d-flex flex-wrap align-items-center justify-content-between gap-3 weather-banner">
        <div>
          <p className="as-text-soft m-0 mb-1 stat-label-small text-white opacity-75">Today's Condition</p>
          <h3 className="as-section-title text-white mb-1 weather-banner-title">🌧 Good Planting Day</h3>
          <p className="as-text-soft m-0 weather-banner-desc">Rain expected · High humidity · Great for most crops</p>
        </div>
        <div className="text-center p-3 temp-badge-box">
          <div className="as-section-title text-white temp-value-display">28°C</div>
          <div className="as-text-soft mt-1 stat-label-small text-white opacity-75">{location}</div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-7">
          <div className="as-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="as-text-primary fw-bold m-0">7-Day Forecast</h6>
              <button onClick={() => navigate('forecast')} className="as-btn as-btn-outline border-0 p-0 stat-label-small">
                View all <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            <div className="as-table-container">
              {forecast.map((day) => (
                <div key={day.day} className="d-flex align-items-center justify-content-between py-2 border-bottom forecast-item">
                  <div className="d-flex align-items-center gap-2 forecast-day-name">
                    <span className="forecast-icon">{day.icon}</span>
                    <span className="as-text-accent fw-bold stat-label-small">{day.day}</span>
                  </div>
                  <span className="as-text-primary fw-bold forecast-temp">{day.temp}</span>
                  <span className="as-text-soft forecast-rain">{day.rain}% rain</span>
                  <span className={`as-badge ${day.good ? 'as-badge-active' : 'as-badge-inactive'}`}>
                    {day.good ? '✓ Good' : '✗ Poor'}
                  </span>
                  <button
                    onClick={() => !isAlreadySaved(day.label) && navigate('forecast')}
                    disabled={isAlreadySaved(day.label)}
                    className={`as-btn ${isAlreadySaved(day.label) ? 'as-btn-outline border-0' : 'as-btn-primary'} py-1 px-3 forecast-temp`}
                  >
                    {isAlreadySaved(day.label) ? <><i className="bi bi-check"></i> Saved</> : 'Save'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="as-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="as-text-primary fw-bold m-0">Saved Dates</h6>
              <button onClick={() => navigate('saved')} className="as-btn as-btn-outline border-0 p-0 stat-label-small">
                View all <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            {savedDates.length === 0 ? (
              <div className="text-center py-4">
                <div className="empty-state-icon">📅</div>
                <p className="as-text-soft m-0 empty-state-text">No saved dates yet.<br />Save a good farming day!</p>
              </div>
            ) : savedDates.slice(0, 3).map((d) => (
              <div key={d.id} className="as-card mb-2 p-3 saved-item-card">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div className="overflow-hidden">
                    <div className="as-text-primary fw-bold saved-item-title">{d.icon} {d.label}</div>
                    {d.note && <div className="as-text-soft text-truncate mt-1 saved-item-note">📝 {d.note}</div>}
                  </div>
                  <button onClick={() => deleteDate(d.id)} className="as-btn as-btn-danger border-0 p-1">
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default FarmerOverview
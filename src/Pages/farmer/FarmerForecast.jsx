import React, { useState } from 'react'
import { useFarmer } from '../../context/DashboardContext'
import SaveDateModal from '../../components/SaveDateModal'
import './FarmerForecast.css'

const forecast = [
  { label: 'Monday',    day: 'Mon', icon: '🌧', temp: '24°C', rain: 72, humidity: 80, wind: '12 km/h', good: true  },
  { label: 'Tuesday',   day: 'Tue', icon: '☀️', temp: '31°C', rain: 8,  humidity: 40, wind: '8 km/h',  good: false },
  { label: 'Wednesday', day: 'Wed', icon: '⛅', temp: '27°C', rain: 55, humidity: 65, wind: '10 km/h', good: true  },
  { label: 'Thursday',  day: 'Thu', icon: '☀️', temp: '33°C', rain: 5,  humidity: 35, wind: '6 km/h',  good: false },
  { label: 'Friday',    day: 'Fri', icon: '🌦', temp: '26°C', rain: 68, humidity: 75, wind: '14 km/h', good: true  },
  { label: 'Saturday',  day: 'Sat', icon: '🌩', temp: '22°C', rain: 85, humidity: 88, wind: '20 km/h', good: true  },
  { label: 'Sunday',    day: 'Sun', icon: '☀️', temp: '30°C', rain: 12, humidity: 42, wind: '7 km/h',  good: false },
]

const FarmerForecast = () => {
  const { location, isAlreadySaved, saveDate } = useFarmer()
  const [modalDay, setModalDay] = useState(null)

  return (
    <>
      <div className="as-section-header mb-4">
        <div className="as-header-line" />
        <h5 className="as-section-title">7-Day Forecast</h5>
        <span className="forecast-location-meta ms-2">· {location}</span>
      </div>

      <div className="row g-3">
        {forecast.map((day) => (
          <div className="col-6 col-md-4 col-xl-3" key={day.day}>
            <div className={`forecast-card-detailed ${day.good ? 'forecast-card-good' : 'forecast-card-poor'}`}>
              
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-1">
                <span className="forecast-day-label">{day.label}</span>
                <span className={`as-badge ${day.good ? 'as-badge-active' : 'as-badge-inactive'}`}>
                  {day.good ? '✓ Good' : '✗ Poor'}
                </span>
              </div>

              <div className="forecast-icon-large">{day.icon}</div>
              <div className="forecast-temp-value">{day.temp}</div>

              <div className="forecast-stats-list">
                {[
                  { icon: 'bi-cloud-rain', label: 'Rain',     value: `${day.rain}%`,     color: '#4db6e4' },
                  { icon: 'bi-droplet',    label: 'Humidity', value: `${day.humidity}%`,  color: 'var(--as-primary-green)' },
                  { icon: 'bi-wind',       label: 'Wind',     value: day.wind,            color: '#a78bfa' },
                ].map((d) => (
                  <div key={d.label} className="forecast-stat-item">
                    <span className="forecast-stat-label">
                      <i className={`bi ${d.icon} me-1`}></i>{d.label}
                    </span>
                    <span className="forecast-stat-value" style={{ color: d.color }}>{d.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => !isAlreadySaved(day.label) && setModalDay(day)}
                disabled={isAlreadySaved(day.label)}
                className={`as-btn w-100 py-2 save-date-btn ${isAlreadySaved(day.label) ? 'save-date-btn-saved' : 'as-btn-primary'}`}
              >
                {isAlreadySaved(day.label)
                  ? <><i className="bi bi-check-lg me-1"></i>Saved</>
                  : <><i className="bi bi-calendar-plus me-1"></i>Save Date</>
                }
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalDay && (
        <SaveDateModal
          day={modalDay}
          onSave={saveDate}
          onClose={() => setModalDay(null)}
        />
      )}
    </>
  )
}

export default FarmerForecast
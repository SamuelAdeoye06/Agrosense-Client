import React, { useState } from 'react'
import { useAdmin } from '../../context/DashboardContext'
import './AdminWeatherRules.css'

const Pill = ({ children }) => (
  <span className="formula-pill">
    {children}
  </span>
)

const AdminWeatherRules = () => {
  const { thresholds, setThresholds, saveThresholds } = useAdmin()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    saveThresholds()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const fields = [
    { key: 'rain',     label: 'Minimum Rain Chance', icon: 'bi-cloud-rain',       color: '#4db6e4', min: 0, max: 100, unit: '%',     desc: 'Days with at least this rain chance are marked good' },
    { key: 'humidity', label: 'Minimum Humidity',    icon: 'bi-droplet',           color: '#52b788', min: 0, max: 100, unit: '%',     desc: 'Minimum humidity level for a good farming day'       },
    { key: 'wind',     label: 'Maximum Wind Speed',  icon: 'bi-wind',              color: '#95d5b2', min: 0, max: 60,  unit: ' km/h', desc: 'Days with wind above this are not ideal'             },
    { key: 'temp_min', label: 'Minimum Temperature', icon: 'bi-thermometer-low',  color: '#74c69d', min: 0, max: 50,  unit: '°C',    desc: 'Too cold below this temperature'                     },
    { key: 'temp_max', label: 'Maximum Temperature', icon: 'bi-thermometer-high', color: '#2d6a4f', min: 0, max: 50,  unit: '°C',    desc: 'Too hot above this temperature'                      },
  ]

  return (
    <div className="weather-rules-container">
      <div className="as-section-header mb-2">
        <div className="as-header-line" />
        <h5 className="as-section-title">Weather Rules</h5>
      </div>
      <p className="weather-rules-subtitle">
        Define what makes a "Good Farming Day". These thresholds apply to all farmers on the platform.
      </p>

      {/* Live preview banner */}
      <div className="formula-preview-banner">
        <p className="formula-label">Live Formula Preview</p>
        <p className="formula-content">
          Rain ≥ <Pill>{thresholds.rain}%</Pill>
          {' '}AND Humidity ≥ <Pill>{thresholds.humidity}%</Pill>
          {' '}AND Wind ≤ <Pill>{thresholds.wind} km/h</Pill><br />
          Temp between <Pill>{thresholds.temp_min}°C</Pill> and <Pill>{thresholds.temp_max}°C</Pill>
        </p>
      </div>

      {/* Sliders */}
      <div className="rules-card">
        {fields.map((field) => (
          <div key={field.key}>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="field-label">
                <i className={`bi ${field.icon} me-2`} style={{ color: field.color }}></i>
                {field.label}
              </label>
              <span className="field-value-badge">
                {thresholds[field.key]}{field.unit}
              </span>
            </div>
            <p className="field-description">{field.desc}</p>
            <input
              type="range"
              min={field.min}
              max={field.max}
              value={thresholds[field.key]}
              onChange={(e) => setThresholds({ ...thresholds, [field.key]: Number(e.target.value) })}
              className="field-range-input"
            />
            <div className="d-flex justify-content-between range-labels">
              <span>{field.min}{field.unit}</span>
              <span>{field.max}{field.unit}</span>
            </div>
          </div>
        ))}

        <button
          onClick={handleSave}
          className={`as-btn w-100 py-3 save-rules-btn ${saved ? 'save-rules-btn-saved' : 'as-btn-primary'}`}
        >
          {saved
            ? <><i className="bi bi-check-lg me-2"></i>Rules Saved Successfully!</>
            : <><i className="bi bi-save me-2"></i>Save Weather Rules</>
          }
        </button>
      </div>
    </div>
  )
}

export default AdminWeatherRules
import React, { useState } from 'react'
import { useFarmer } from '../../context/DashboardContext'
import SaveDateModal from '../../components/SaveDateModal'
import './FarmerForecast.css'

const FarmerForecast = () => {
    const {
        location,
        forecast,
        weatherLoading,
        weatherError,
        loadWeather,
        isAlreadySaved,
        saveDate
    } = useFarmer()

    const [modalDay, setModalDay] = useState(null)

    // ── Loading ──
    if (weatherLoading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-success" role="status" />
                <p className="as-text-soft mt-3">Loading 7-day forecast...</p>
            </div>
        )
    }

    // ── Error ──
    if (weatherError) {
        return (
            <div className="text-center py-5">
                <div className="empty-state-icon">⚠️</div>
                <p className="as-text-primary fw-bold mt-2">{weatherError}</p>
                <button onClick={loadWeather} className="as-btn as-btn-primary mt-2">
                    Try Again
                </button>
            </div>
        )
    }

    // ── No data ──
    if (!forecast || forecast.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="empty-state-icon">🌤</div>
                <p className="as-text-soft mt-2">No forecast data available yet.</p>
                <button onClick={loadWeather} className="as-btn as-btn-primary mt-2">
                    Load Forecast
                </button>
            </div>
        )
    }

    return (
        <>
            {/* ── Header ── */}
            <div className="as-section-header mb-4">
                <div className="as-header-line" />
                <h5 className="as-section-title">7-Day Forecast</h5>
                <span className="forecast-location-meta ms-2">· {location}</span>
            </div>

            {/* ── Forecast cards ── */}
            <div className="row g-3">
                {forecast.map((day) => (
                    <div className="col-6 col-md-4 col-xl-3" key={day.date}>
                        <div className={`forecast-card-detailed ${day.isGoodDay ? 'forecast-card-good' : 'forecast-card-poor'}`}>

                            {/* day name + badge */}
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-1">
                                <span className="forecast-day-label">{day.dayLabel}</span>
                                <span className={`as-badge ${day.isGoodDay ? 'as-badge-active' : 'as-badge-inactive'}`}>
                                    {day.isGoodDay ? '✓ Good' : '✗ Poor'}
                                </span>
                            </div>

                            {/* icon + temp */}
                            <div className="forecast-icon-large">{day.icon}</div>
                            <div className="forecast-temp-value">{day.temp}°C</div>

                            {/* condition label from decision engine */}
                            <div className="forecast-condition-label mb-2">
                                {day.label}
                            </div>

                            {/* weather stats */}
                            <div className="forecast-stats-list">
                                {[
                                    { icon: 'bi-cloud-rain', label: 'Rain',     value: `${day.rain}%`,           color: '#4db6e4' },
                                    { icon: 'bi-droplet',    label: 'Humidity', value: `${day.humidity}%`,        color: 'var(--as-primary-green)' },
                                    { icon: 'bi-wind',       label: 'Wind',     value: `${day.windSpeed} km/h`,   color: '#a78bfa' },
                                ].map((s) => (
                                    <div key={s.label} className="forecast-stat-item">
                                        <span className="forecast-stat-label">
                                            <i className={`bi ${s.icon} me-1`}></i>{s.label}
                                        </span>
                                        <span className="forecast-stat-value" style={{ color: s.color }}>
                                            {s.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* recommendation from decision engine */}
                            {day.recommendation && (
                                <p className="forecast-recommendation mt-2 mb-2">
                                    {day.recommendation}
                                </p>
                            )}

                            {/* crop category tips */}
                            {day.categoryTips && day.categoryTips.length > 0 && (
                                <div className="forecast-tips mt-1 mb-2">
                                    {day.categoryTips.slice(0, 2).map((tip, i) => (
                                        <div key={i} className="forecast-tip-item">
                                            {tip.icon} <span>{tip.tip}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* save button */}
                            <button
                                onClick={() => !isAlreadySaved(day.date) && setModalDay(day)}
                                disabled={isAlreadySaved(day.date)}
                                className={`as-btn w-100 py-2 save-date-btn ${isAlreadySaved(day.date) ? 'save-date-btn-saved' : 'as-btn-primary'}`}
                            >
                                {isAlreadySaved(day.date)
                                    ? <><i className="bi bi-check-lg me-1"></i>Saved</>
                                    : <><i className="bi bi-calendar-plus me-1"></i>Save Date</>
                                }
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Save date modal ── */}
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
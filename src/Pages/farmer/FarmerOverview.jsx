import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFarmer } from '../../context/DashboardContext'
import './FarmerOverview.css'
import SaveDateModal from '../../components/SaveDateModal'

const FarmerOverview = () => {
    const [modalDay, setModalDay] = useState(null)

    const {
         location, savedDates, deleteDate, isAlreadySaved, todayWeather, forecast, activeAlert, weatherLoading, weatherError, loadWeather, saveDate
    } = useFarmer()

    const navigate = useNavigate()

    // ── Loading state ──
    if (weatherLoading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-success" role="status" />
                <p className="as-text-soft mt-3">Fetching weather for {location || 'your farm'}...</p>
            </div>
        )
    }

    // ── Error state ──
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

    // ── No data yet ──
    if (!todayWeather) {
        return (
            <div className="text-center py-5">
                <div className="empty-state-icon">🌤</div>
                <p className="as-text-soft mt-2">No weather data yet.</p>
                <button onClick={loadWeather} className="as-btn as-btn-primary mt-2">
                    Load Weather
                </button>
            </div>
        )
    }

    // ── Stat cards ──
    const statCards = [
        {
            icon:  '🌡',
            label: 'Temperature Now',
            value: `${todayWeather.temp}°C`,
            sub:   `Today's range: ${forecast[0]?.tempMin ?? '--'}°C – ${forecast[0]?.tempMax ?? '--'}°C`,
            color: '#ff8c42'
        },
        {
            icon:  '🌧',
            label: 'Rain Chance',
            value: `${forecast[0]?.rain ?? 0}%`,
            sub:   forecast[0]?.rain > 60 ? 'Likely to rain today' : 'Low rain chance today',
            color: 'var(--as-primary-green)'
        },
        {
            icon:  '💧',
            label: 'Humidity',
            value: `${todayWeather.humidity}%`,
            sub:   todayWeather.humidity > 70 ? 'High moisture levels' : 'Moderate humidity',
            color: '#4db6e4'
        },
        {
            icon:  activeAlert ? '⚠️' : '✅',
            label: 'Farm Alert',
            value: activeAlert ? 'Alert' : 'All Clear',
            sub:   activeAlert
                ? activeAlert.message.slice(0, 48) + '...'
                : 'No severe weather today',
            color: activeAlert ? '#f87171' : 'var(--as-primary-green)'
        },
    ]

    // preview of first 5 forecast days for the mini table
    const forecastPreview = forecast.slice(0, 5)

    return (
        <>
            {/* ── Section header ── */}
            <div className="as-section-header mb-3">
                <div className="as-header-line" />
                <h6 className="as-text-primary fw-bold m-0 stat-label-small">
                    Current Weather Forecast
                </h6>
                <span className="as-badge as-badge-active ms-2">{location}</span>
            </div>

            {/* ── 4 stat cards ── */}
            <div className="row g-3 mb-4">
                {statCards.map((stat) => (
                    <div className="col-6 col-lg-3" key={stat.label}>
                        <div className="as-card">
                            <div className="stat-icon-large">{stat.icon}</div>
                            <div className="stat-value-large" style={{ color: stat.color }}>
                                {stat.value}
                            </div>
                            <div className="as-text-primary fw-bold mt-2 stat-label-small">
                                {stat.label}
                            </div>
                            <div className="as-text-soft stat-sub-text">{stat.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Today's condition banner ── */}
            <div className="mb-4 p-4 d-flex flex-wrap align-items-center justify-content-between gap-3 weather-banner">
                <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                        <p className="as-text-soft m-0 stat-label-small text-white opacity-75">
                            Today's Current Condition
                        </p>
                        {todayWeather.rainTiming && todayWeather.rainTiming !== 'none' && (
                            <span className="overview-timing-badge">
                                {todayWeather.rainTiming === 'night'     ? '🌙 Night Rain'
                                : todayWeather.rainTiming === 'morning'  ? '🌤 Morning Rain'
                                : todayWeather.rainTiming === 'afternoon'? '☀️ Afternoon Rain'
                                :                                          '🌧 Intermittent Rain'}
                            </span>
                        )}
                    </div>
                    <h3 className="as-section-title text-white mb-1 weather-banner-title">
                        {todayWeather.icon} {todayWeather.label || (todayWeather.isGoodDay ? 'Suitable' : 'Unsafe')} Conditions
                    </h3>
                    <p className="as-text-soft m-0 weather-banner-desc">
                        {todayWeather.recommendation}
                    </p>
                </div>
                <div className="text-center p-3 temp-badge-box">
                    <div className="as-section-title text-white temp-value-display">
                        {todayWeather.temp}°C
                    </div>
                    <div className="as-text-soft mt-1 stat-label-small text-white opacity-75">
                        {location}
                    </div>
                </div>
            </div>

            {/* ── Alert banner ── */}
            {activeAlert && (
                <div className="mb-4 p-3 rounded-3 d-flex align-items-start gap-3 alert-banner">
                    <span className="alert-banner-icon">
                        {activeAlert.type === 'flood' ? '🌊'
                            : activeAlert.type === 'wind' ? '💨'
                            : '🌡'}
                    </span>
                    <div>
                        <p className="fw-bold m-0 alert-banner-title d-flex align-items-center gap-2">
                            {activeAlert.severity === 'high' ? 'Severe Weather Alert' : 'Weather Warning'}
                            {activeAlert.timing === 'night' && (
                                <span className="overnight-badge">🌙 Overnight Alert</span>
                            )}
                        </p>
                        <p className="m-0 alert-banner-message">{activeAlert.message}</p>
                    </div>
                </div>
            )}

            <div className="row g-3">
                {/* ── 7-day forecast mini table ── */}
                <div className="col-12 col-lg-7">
                    <div className="as-card">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="as-text-primary fw-bold m-0">7-Day Forecast</h6>
                            <button
                                onClick={() => navigate('../forecast')}
                                className="as-btn as-btn-outline border-0 p-0 stat-label-small"
                             >
                                View all <i className="bi bi-arrow-right"></i>
                            </button>
                        </div>

                        {forecastPreview.length === 0 ? (
                            <p className="as-text-soft text-center py-3 m-0">
                                No forecast data available.
                            </p>
                        ) : (
                            <div className="as-table-container">
                                {forecastPreview.map((day) => (
                                    <div key={day.date} className="d-flex align-items-center justify-content-between py-2 border-bottom forecast-item gap-2">
                                        
                                        <div className="d-flex align-items-center gap-2 forecast-day-col">
                                            <span className="forecast-icon">{day.icon}</span>
                                            <span className="as-text-accent fw-bold stat-label-small">{day.dayShort}</span>
                                        </div>

                                        <span className="as-text-primary fw-bold forecast-temp forecast-temp-col">
                                            {day.temp}°C
                                        </span>

                                        <div className="d-flex flex-column forecast-rain-col">
                                            <span className="as-text-soft forecast-rain m-0">{day.rain}% rain</span>
                                            {day.rainTiming && day.rainTiming !== 'none' && (
                                                <span className="as-text-soft forecast-rain-timing m-0">
                                                    {day.rainTiming === 'night'     ? '🌙 Night'
                                                    : day.rainTiming === 'morning'  ? '🌤 Morn'
                                                    : day.rainTiming === 'afternoon'? '☀️ Aft'
                                                    :                                 '🌧 Timing'}
                                                </span>
                                            )}
                                        </div>

                                        <div className="activity-matrix">
                                            {day.recommendedActivities?.slice(0, 3).map((act) => (
                                                <span key={act.key} title={act.label} className="activity-matrix-icon">{act.icon}</span>
                                            ))}
                                            {day.recommendedActivities?.length > 3 && (
                                                <span className="as-text-soft activity-matrix-more">
                                                    +{day.recommendedActivities.length - 3}
                                                </span>
                                            )}
                                            {(!day.recommendedActivities || day.recommendedActivities.length === 0) && (
                                                <span className="as-text-soft activity-matrix-empty">—</span>
                                            )}
                                        </div>

                                        <span className={`suitability-badge ${
                                            day.label === 'Optimal'    ? 'suitability-badge-optimal'
                                            : day.label === 'Suitable'   ? 'suitability-badge-suitable'
                                            : day.label === 'Restricted' ? 'suitability-badge-restricted'
                                            :                              'suitability-badge-unsafe'
                                        }`}>
                                            {day.label || (day.isGoodDay ? 'Suitable' : 'Unsafe')}
                                        </span>

                                        <button
                                            onClick={() => { if (!isAlreadySaved(day.date)) setModalDay(day) }}
                                            disabled={isAlreadySaved(day.date)}
                                            className={`as-btn ${isAlreadySaved(day.date) ? 'as-btn-outline border-0' : 'as-btn-primary'} py-1 px-3 forecast-temp`}
                                        >
                                            {isAlreadySaved(day.date) ? <><i className="bi bi-check"></i> Saved</> : 'Save'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Saved dates preview ── */}
                <div className="col-12 col-lg-5">
                    <div className="as-card">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="as-text-primary fw-bold m-0">
                                Saved Dates
                                {savedDates.length > 0 && (
                                    <span className="as-badge as-badge-active ms-2">
                                        {savedDates.length}
                                    </span>
                                )}
                            </h6>
                            <button
                                onClick={() => navigate('../saved')}
                                className="as-btn as-btn-outline border-0 p-0 stat-label-small"
                            >
                                View all <i className="bi bi-arrow-right"></i>
                            </button>
                        </div>

                        {savedDates.length === 0 ? (
                            <div className="text-center py-4">
                                <div className="empty-state-icon">📅</div>
                                <p className="as-text-soft m-0 empty-state-text">
                                    No saved dates yet.<br />Save a good farming day!
                                </p>
                            </div>
                        ) : (
                            savedDates.slice(0, 3).map((d) => (
                                <div key={d._id} className="d-flex align-items-start justify-content-between py-2 border-bottom gap-2 forecast-item">
                                    <div className="overflow-hidden">
                                        <div className="as-text-primary fw-bold saved-preview-title">
                                            {d.weatherSnapshot?.icon || '📅'} {d.dayLabel} — {d.date}
                                        </div>
                                        {d.cropName && (
                                            <div className="as-text-soft saved-preview-sub">🌱 {d.cropName}</div>
                                        )}
                                        {d.note && (
                                            <div className="as-text-soft text-truncate saved-preview-note">📝 {d.note}</div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => deleteDate(d._id)}
                                        className="as-btn as-btn-danger border-0 p-1 flex-shrink-0 saved-preview-delete"
                                    >
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
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

export default FarmerOverview
import React, { useState } from 'react'
import './SaveDateModal.css'

const ACTIVITIES = [
    { value: "planting",   icon: "🌱", label: "Planting",            desc: "Sowing seeds or transplanting seedlings" },
    { value: "harvesting", icon: "🌾", label: "Harvesting",          desc: "Collecting mature crops from the farm" },
    { value: "spraying",   icon: "🧪", label: "Spraying",            desc: "Applying pesticides, herbicides or fertilizer" },
    { value: "irrigation", icon: "💧", label: "Irrigation",          desc: "Watering crops during dry conditions" },
    { value: "general",    icon: "🚜", label: "General Farm Work",   desc: "Weeding, mounding, pruning or other tasks" },
]

const SaveDateModal = ({ day, onSave, onClose }) => {
    const [note, setNote]             = useState('')
    const [activity, setActivity]     = useState('')
    const [saving, setSaving]         = useState(false)
    const [error, setError]           = useState(null)

    const handleSave = async () => {
        setSaving(true)
        setError(null)

        const payload = {
            date:     day.date,
            dayLabel: day.dayLabel,
            note,
            cropName: activity,   // repurposing cropName field to store activity
            weatherSnapshot: {
                temp:        day.temp,
                tempUnit:    "°C",
                rain:        day.rain,
                humidity:    day.humidity,
                windSpeed:   day.windSpeed,
                icon:        day.icon,
                description: day.description
            },
            recommendation: day.recommendation || "",
            isGoodDay:      day.isGoodDay || false
        }

        const result = await onSave(payload)
        if (result?.success === false) {
            setError(result.message)
            setSaving(false)
        } else {
            setSaving(false)
            onClose()
        }
    }

    // check if the chosen activity is actually recommended today
    const chosenActivityRecommended = activity && day.recommendedActivities?.some(a => a.key === activity)
    const chosenActivityWarning = activity && !chosenActivityRecommended && activity !== "general"

    return (
        <div className="as-modal-overlay" onClick={onClose}>
            <div className="as-modal-card" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="as-modal-close-btn">
                    <i className="bi bi-x-lg"></i>
                </button>

                <div className="as-modal-icon">📅</div>
                <h5 className="as-modal-title">Save {day?.dayLabel} as a Farming Day</h5>
                <p className="as-modal-subtitle">
                    {day?.icon} {day?.temp}°C · {day?.rain}% rain · {day?.humidity}% humidity
                </p>

                {/* decision label */}
                {day?.label && (
                    <div className={`as-modal-decision-badge mb-3 ${day.isGoodDay ? 'badge-good' : 'badge-poor'}`}>
                        {day.isGoodDay ? '✓' : '⚠'} {day.label}
                    </div>
                )}

                {/* recommended activities */}
                {day?.recommendedActivities?.length > 0 && (
                    <div className="modal-recommended-row mb-3">
                        <p className="as-modal-label mb-1">Recommended today:</p>
                        <div className="d-flex flex-wrap gap-2">
                            {day.recommendedActivities.map(a => (
                                <span key={a.key} className="modal-activity-chip modal-activity-chip-good">
                                    {a.icon} {a.label}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger py-2 mb-3 text-start">{error}</div>
                )}

                {/* activity selector */}
                <label className="as-modal-label">
                    What are you planning to do?
                    <span className="as-modal-label-optional"> (optional)</span>
                </label>
                <div className="modal-activity-grid mb-3">
                    {ACTIVITIES.map((act) => {
                        const isRecommended = day.recommendedActivities?.some(a => a.key === act.value)
                        return (
                            <button
                                key={act.value}
                                onClick={() => setActivity(act.value === activity ? '' : act.value)}
                                className={`modal-activity-btn ${activity === act.value ? 'modal-activity-btn-selected' : ''} ${isRecommended ? 'modal-activity-btn-recommended' : ''}`}
                            >
                                <span className="activity-btn-icon">{act.icon}</span>
                                <span className="activity-btn-label">{act.label}</span>
                                {isRecommended && <span className="activity-recommended-dot" />}
                            </button>
                        )
                    })}
                </div>

                {/* warning if farmer picks a non-recommended activity */}
                {chosenActivityWarning && (
                    <div className="modal-activity-warning mb-3">
                        ⚠️ Today's conditions are not ideal for {ACTIVITIES.find(a => a.value === activity)?.label.toLowerCase()}. You can still save this date but consider the weather.
                    </div>
                )}

                {/* note */}
                <label className="as-modal-label">
                    Add a Note
                    <span className="as-modal-label-optional"> (optional)</span>
                </label>
                <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. Spray north field with fungicide before noon..."
                    className="as-modal-textarea"
                />

                <div className="d-flex gap-3 mt-4">
                    <button onClick={onClose} className="btn flex-grow-1 py-2 as-modal-btn-cancel" disabled={saving}>
                        Cancel
                    </button>
                    <button onClick={handleSave} className="btn flex-grow-1 py-2 as-modal-btn-save" disabled={saving}>
                        {saving
                            ? <><span className="spinner-border spinner-border-sm me-2" />Saving...</>
                            : <><i className="bi bi-check-lg me-2"></i>Save Date</>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SaveDateModal
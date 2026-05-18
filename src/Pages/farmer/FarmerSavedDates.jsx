import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFarmer } from '../../context/DashboardContext'
import './FarmerSavedDates.css'

const FarmerSavedDates = () => {
  const { savedDates, deleteDate, updateNote } = useFarmer()
  const navigate = useNavigate()
  const [editingNoteId, setEditingNoteId]     = useState(null)
  const [editingNoteText, setEditingNoteText] = useState('')

  const startEdit = (d) => { setEditingNoteId(d.id); setEditingNoteText(d.note || '') }
  const cancelEdit = ()  => setEditingNoteId(null)
  const saveEdit   = (id) => { updateNote(id, editingNoteText); setEditingNoteId(null) }

  return (
    <>
      <div className="saved-dates-header">
        <div className="as-section-header">
          <div className="as-header-line" />
          <h5 className="as-section-title">Saved Favorable Dates</h5>
        </div>
        <span className="saved-count-badge">
          {savedDates.length} saved
        </span>
      </div>

      {savedDates.length === 0 ? (
        <div className="empty-saved-card">
          <div className="empty-saved-icon">📅</div>
          <h6 className="as-text-primary fw-bold">No Saved Dates Yet</h6>
          <p className="empty-saved-subtitle">
            Go to the Forecast section and save your best farming days.
          </p>
          <button
            onClick={() => navigate('../forecast', { relative: 'path' })}
            className="as-btn as-btn-primary px-4 py-2"
          >
            View Forecast
          </button>
        </div>
      ) : (
        <div className="row g-3">
          {savedDates.map((d) => (
            <div className="col-12 col-md-6 col-xl-4" key={d.id}>
              <div className="saved-date-card">
                
                {/* Header */}
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div>
                    <div className="saved-card-title">{d.icon} {d.label}</div>
                    <div className="saved-card-meta">{d.temp} · {d.rain}% rain</div>
                  </div>
                  <button onClick={() => deleteDate(d.id)} className="btn delete-saved-btn">
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>

                {/* Note editor */}
                {editingNoteId === d.id ? (
                  <div>
                    <textarea
                      rows={2}
                      value={editingNoteText}
                      onChange={(e) => setEditingNoteText(e.target.value)}
                      className="note-textarea"
                    />
                    <div className="d-flex gap-2 mt-2">
                      <button onClick={() => saveEdit(d.id)} className="as-btn as-btn-primary btn-sm flex-grow-1 py-2">
                        Save Note
                      </button>
                      <button onClick={cancelEdit} className="as-btn as-btn-outline btn-sm px-3 py-2">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="note-display-box">
                    <span className={`note-text-content ${d.note ? 'note-text-filled' : 'note-text-empty'}`}>
                      {d.note || 'No note added yet...'}
                    </span>
                    <button onClick={() => startEdit(d)} className="edit-note-btn">
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default FarmerSavedDates
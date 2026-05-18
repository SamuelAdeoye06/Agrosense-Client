import React, { useState } from 'react'
import './SaveDateModal.css'

const SaveDateModal = ({ day, onSave, onClose }) => {
  const [note, setNote] = useState('')

  const handleSave = () => {
    onSave({ ...day, note })
    onClose()
  }

  return (
    <div className="as-modal-overlay" onClick={onClose}>
      <div className="as-modal-card" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="as-modal-close-btn">
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="as-modal-icon">📅</div>
        <h5 className="as-modal-title">
          Save {day?.label} as a Favorable Date
        </h5>
        <p className="as-modal-subtitle">
          {day?.icon} {day?.temp} · {day?.rain}% rain chance
        </p>

        <label className="as-modal-label">
          Add a Note <span className="as-modal-label-optional">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Plant maize on the north field..."
          className="as-modal-textarea"
        />

        <div className="d-flex gap-3 mt-4">
          <button onClick={onClose} className="btn flex-grow-1 py-2 as-modal-btn-cancel">
            Cancel
          </button>
          <button onClick={handleSave} className="btn flex-grow-1 py-2 as-modal-btn-save">
            <i className="bi bi-check-lg me-2"></i>Save Date
          </button>
        </div>
      </div>
    </div>
  )
}

export default SaveDateModal
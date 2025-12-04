// src/customer_dashboard/UploadModal.jsx
import React, { useState } from "react";

export default function UploadModal({ onClose }) {
  const [filePreview, setFilePreview] = useState(null);
  const [note, setNote] = useState("");

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setFilePreview({ name: f.name, url });
    // in real app: upload to cloud & save reference to user
  };

  return (
    <div className="modal-overlay">
      <div className="modal upload-modal-box">
        <button className="close-modal" onClick={onClose}>✖</button>
        <h3>Upload Prescription</h3>
        <p className="muted">Upload a clear image or PDF. Pharmacist will verify before approval.</p>

        <input type="file" accept="image/*,.pdf" onChange={handleFile} />
        {filePreview && <div className="uploaded-preview">
          <img src={filePreview.url} alt={filePreview.name} />
          <div className="uploaded-meta">{filePreview.name}</div>
        </div>}

        <textarea placeholder="Notes for pharmacist (optional)" value={note} onChange={(e)=>setNote(e.target.value)} />

        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={()=>{ alert('Prescription uploaded (demo)'); onClose(); }}>Upload & Submit</button>
        </div>
      </div>
    </div>
  );
}

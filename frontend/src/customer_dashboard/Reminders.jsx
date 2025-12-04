// src/customer_dashboard/Reminders.jsx
import React, { useState } from "react";

export default function Reminders({ reminders, onCreate }) {
  const [name, setName] = useState("");
  const [days, setDays] = useState(30);

  function submit() {
    if(!name) return alert("Enter medicine name");
    onCreate(name, days);
    setName(""); setDays(30);
  }

  return (
    <section className="reminders-section">
      <div className="reminders-head">
        <h3>Refill Reminders</h3>
        <div className="add-reminder">
          <input placeholder="Medicine name" value={name} onChange={e=>setName(e.target.value)} />
          <input type="number" min="1" value={days} onChange={e=>setDays(Number(e.target.value))} />
          <button className="btn small" onClick={submit}>Add</button>
        </div>
      </div>

      <div className="reminder-list">
        {reminders.length===0 && <div className="muted">No reminders yet</div>}
        {reminders.map(r=>(
          <div className="rem-item" key={r.id}>
            <div>{r.medicine}</div>
            <small>Every {r.days} days</small>
          </div>
        ))}
      </div>
    </section>
  );
}

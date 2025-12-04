// src/customer_dashboard/CategoryGrid.jsx
import React from "react";

export default function CategoryGrid({ selected, onSelect }) {
  const cats = [
    { id: "Diabetes", label: "Diabetes Care", icon: "🩺" },
    { id: "Cardiac", label: "Cardiac Care", icon: "❤️" },
    { id: "Digestive", label: "Stomach Care", icon: "🫙" },
    { id: "Pain", label: "Pain Relief", icon: "💊" },
    { id: "Liver", label: "Liver Care", icon: "🧾" },
    { id: "Cold", label: "Cold & Cough", icon: "🤧" },
  ];

  return (
    <div className="category-grid">
      {cats.map(c => (
        <button key={c.id} className={`cat-card ${selected===c.id ? 'active':''}`} onClick={() => onSelect(selected===c.id?null:c.id)}>
          <div className="cat-icon">{c.icon}</div>
          <div className="cat-label">{c.label}</div>
        </button>
      ))}
    </div>
  );
}

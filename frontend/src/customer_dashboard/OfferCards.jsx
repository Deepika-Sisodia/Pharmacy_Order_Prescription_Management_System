// src/customer_dashboard/OfferCards.jsx
import React from "react";

export default function OfferCards({ onUpload }) {
  const cards = [
    { id: 1, title: "Get 20%* off on Medicines", subtitle: "UPLOAD NOW", onClick: onUpload, bg: "mint" },
    { id: 2, title: "Doctor Appointment", subtitle: "BOOK NOW", onClick: ()=>alert("Book Doctor (demo)"), bg: "lavender" },
    { id: 3, title: "Health Insurance", subtitle: "EXPLORE PLANS", onClick: ()=>alert("Explore Insurance (demo)"), bg: "cream" },
    { id: 4, title: "Lab Tests", subtitle: "AT HOME", onClick: ()=>alert("Lab Tests (demo)"), bg: "pink" },
  ];
  return (
    <div className="offers">
      {cards.map(c => (
        <div key={c.id} className={`offer-card ${c.bg}`} onClick={c.onClick}>
          <div className="offer-left">
            <div className="offer-title">{c.title}</div>
            <div className="offer-sub">{c.subtitle}</div>
          </div>
          <div className="offer-arrow">›</div>
        </div>
      ))}
    </div>
  );
}

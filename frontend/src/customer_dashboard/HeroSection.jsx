// src/customer_dashboard/HeroSection.jsx
import React from "react";

export default function HeroSection({ query, setQuery, onUpload }) {
  return (
    <section className="hero">
      <div className="hero-topnav">
        <div className="categories-row">
          <div className="cat">FarmTech Products</div>
          <div className="cat">Baby Care</div>
          <div className="cat">Nutritional Drinks</div>
          <div className="cat">Women Care</div>
          <div className="cat">Health Devices</div>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-illustration" aria-hidden>
          {/* left illustration placeholder */}
        </div>

        <div className="hero-center">
          <h1>Buy Medicines and Essentials</h1>
          <div className="hero-search">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Medicines by brand, generic or symptom" />
            <button className="btn-search" aria-label="Search">🔍</button>
          </div>

          <div className="hero-cta">
            <button className="btn-ghost" onClick={onUpload}>Upload Prescription</button>
          </div>
        </div>

        <div className="hero-illustration-right" aria-hidden>
          {/* right illustration placeholder */}
        </div>
      </div>
    </section>
  );
}

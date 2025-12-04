// src/customer_dashboard/ProductDetails.jsx
import React from "react";

export default function ProductDetails({ product, onClose, onAdd }) {
  // sample substitutes logic: suggest generics with same generic name
  const substitutes = [
    // in real app lookup from API
    { id: "s1", brand: product.generic + " - Generic", price: Math.max(10, product.price * 0.6) }
  ];
  return (
    <div className="modal-overlay">
      <div className="modal product-modal">
        <button className="close-modal" onClick={onClose}>✖</button>
        <div className="modal-grid">
          <img src={product.image} alt={product.brand} />
          <div>
            <h2>{product.brand}</h2>
            <p className="muted">{product.generic}</p>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>

            <div className="modal-actions">
              <button className="btn primary" onClick={() => { onAdd(product); onClose(); }} disabled={product.stock===0}>Add to cart</button>
              <button className="btn ghost" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>

        <div className="substitutes">
          <h4>Substitute Suggestions</h4>
          {substitutes.map(s => (
            <div key={s.id} className="sub-item">
              <div>{s.brand}</div>
              <div>₹{s.price.toFixed(0)}</div>
              <button className="btn small" onClick={() => alert('Request substitute (demo)')}>Request</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

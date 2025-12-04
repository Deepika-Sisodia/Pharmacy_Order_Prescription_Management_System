// src/customer_dashboard/ProductCard.jsx
import React from "react";

export default function ProductCard({ product, onAdd, onView }) {
  const outOfStock = product.stock === 0;

  return (
    <div className="card product">
      <div className="p-top">
        {/* FIX: added className="product-card-image" */}
        <img
          src={product.image}
          alt={product.brand}
          className="product-card-image"
        />

        {outOfStock && <div className="oos">Out of stock</div>}
      </div>

      <div className="p-body">
        <div className="p-brand">{product.brand}</div>
        <div className="p-generic">{product.generic}</div>
        <div className="p-desc">{product.description}</div>
      </div>

      <div className="p-footer">
        <div className="p-price">₹{product.price}</div>
        <div className="p-actions">
          <button className="btn small" onClick={onView}>View</button>
          <button className="btn primary" onClick={onAdd} disabled={outOfStock}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

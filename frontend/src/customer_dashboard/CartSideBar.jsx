// src/customer_dashboard/CartSidebar.jsx
import React from "react";

export default function CartSidebar({ cart, updateQty, remove, close, onCheckout }) {
  const subtotal = cart.reduce((s,i)=>s + i.price * i.qty, 0);
  return (
    <aside className="cart-panel">
      <div className="cart-head">
        <h3>Your Cart</h3>
        <button className="close-sidebar" onClick={close}>✖</button>
      </div>

      <div className="cart-items">
        {cart.length === 0 && <div className="empty">No items in cart</div>}
        {cart.map(it => (
          <div className="cart-line" key={it.id}>
            <div className="ci-left">
              <img src={it.image} alt={it.brand} />
              <div>
                <div className="ci-brand">{it.brand}</div>
                <div className="ci-generic">{it.generic}</div>
              </div>
            </div>
            <div className="ci-right">
              <div className="qty-controls">
                <button onClick={()=>updateQty(it.id, it.qty-1)}>-</button>
                <span>{it.qty}</span>
                <button onClick={()=>updateQty(it.id, it.qty+1)}>+</button>
              </div>
              <div className="ci-price">₹{(it.price*it.qty).toFixed(0)}</div>
              <button className="link remove" onClick={()=>remove(it.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div>Subtotal</div>
        <div className="bold">₹{subtotal.toFixed(0)}</div>
      </div>

      <div className="cart-actions">
        <button className="btn primary" onClick={()=>onCheckout({paymentMethod:'COD'})} disabled={cart.length===0}>Place Order (COD)</button>
        <button className="btn ghost" onClick={()=>alert('Proceed to online payment (demo)')}>Pay Online</button>
      </div>
    </aside>
  );
}

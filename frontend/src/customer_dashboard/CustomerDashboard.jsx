// src/customer_dashboard/CustomerDashboard.jsx
import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import OfferCards from "./OfferCards";
import CategoryGrid from "./CategoryGrid";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
import CartSidebar from "./CartSideBar";
import UploadModal from "./UploadModal";
import Reminders from "./Reminders";
import "./dashboard.css";

export default function CustomerDashboard() {
  // master state
  const [products, setProducts] = useState(sampleProducts());
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart_v1")) || []);
  const [showCart, setShowCart] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem("orders_v1")) || []);
  const [reminders, setReminders] = useState(() => JSON.parse(localStorage.getItem("reminders_v1")) || []);

  useEffect(() => localStorage.setItem("cart_v1", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("orders_v1", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("reminders_v1", JSON.stringify(reminders)), [reminders]);

  // Filtering for product grid
  const visibleProducts = products.filter((p) => {
    const matchesQuery = !query || p.brand.toLowerCase().includes(query.toLowerCase()) || p.generic.toLowerCase().includes(query.toLowerCase()) || p.symptoms.join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesCat = !selectedCategory || p.categories.includes(selectedCategory);
    return matchesQuery && matchesCat;
  });

  // cart actions
  function addToCart(prod) {
    setCart((c) => {
      const found = c.find((x) => x.id === prod.id);
      if (found) return c.map((x) => x.id === prod.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...prod, qty: 1 }];
    });
    setShowCart(true);
  }
  function updateQty(id, qty) {
    setCart((c) => c.map(x => x.id === id ? { ...x, qty } : x).filter(x => x.qty > 0));
  }
  function removeFromCart(id) {
    setCart((c) => c.filter(x => x.id !== id));
  }
  function placeOrder({ paymentMethod = "COD" } = {}) {
    if (cart.length === 0) { alert("Cart is empty"); return; }
    const order = {
      id: "ORD" + Date.now().toString(36).slice(-6).toUpperCase(),
      items: cart,
      status: "Verification Pending",
      placedAt: new Date().toISOString(),
      paymentMethod
    };
    setOrders((o) => [order, ...o]);
    setCart([]);
    setShowCart(false);
    // simulate status progression
    setTimeout(() => advanceOrder(order.id, "Processing"), 2000);
    setTimeout(() => advanceOrder(order.id, "Out for Delivery"), 5000);
    setTimeout(() => advanceOrder(order.id, "Delivered"), 10000);
  }
  function advanceOrder(id, status) {
    setOrders((os) => os.map(o => o.id === id ? { ...o, status } : o));
  }

  function addReminder(medicine, days=30) {
    const r = { id: "R"+Date.now(), medicine, days, createdAt: new Date().toISOString() };
    setReminders(rs => [r, ...rs]);
  }

  return (
    <div className="pharmacy-page">
      {/* Top nav / header like Apollo with profile + address line */}
      <header className="top-header">
        <div className="brand-row">
          <div className="brand">FarmTech<span className="brand-light"> Pharmacy</span></div>
          <div className="address">Delivery Address · <span className="link">Select Address ▾</span></div>
        </div>
        <div className="top-actions">
          <button className="icon-btn" title="Orders">⚙</button>
          <button className="cart-btn-header" title="Cart" onClick={() => setShowCart(true)}>🛒<span className="count">{cart.reduce((s,i)=>s+i.qty,0)}</span></button>
          <img className="profile" src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" alt="profile" />
        </div>
      </header>

      <HeroSection query={query} setQuery={setQuery} onUpload={() => setShowUpload(true)} />

      <div className="container">
        <OfferCards onUpload={() => setShowUpload(true)} />

        <h3 className="section-title">Browse by Health Conditions</h3>
        <CategoryGrid selected={selectedCategory} onSelect={setSelectedCategory} />

        <div className="products-header">
          <h3>Trending Medicines & Essentials</h3>
          <div className="filters">
            <label>Sort: <select onChange={(e)=>{/* stub */}}><option>Featured</option><option>Price: Low to High</option></select></label>
          </div>
        </div>

        <div className="products-grid">
          {visibleProducts.map(p => (
            <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} onView={() => setSelectedProduct(p)} />
          ))}
        </div>

        <Reminders reminders={reminders} onCreate={addReminder} />

        <h3 className="section-title">Your Orders</h3>
        <div className="orders-list">
          {orders.length === 0 && <div className="empty">No orders yet — place your first order!</div>}
          {orders.map(o => (
            <div className="order-card" key={o.id}>
              <div>
                <div className="order-id">{o.id}</div>
                <div className="order-meta">{new Date(o.placedAt).toLocaleString()} • {o.items.length} items</div>
              </div>
              <div className="order-right">
                <div className={`status-pill status-${o.status.replace(/\s+/g,'-').toLowerCase()}`}>{o.status}</div>
                <button className="btn small" onClick={() => alert(JSON.stringify(o, null, 2))}>Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />}

      {showCart && <CartSidebar cart={cart} updateQty={updateQty} remove={removeFromCart} close={() => setShowCart(false)} onCheckout={placeOrder} />}

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}

      <footer className="site-footer">© Pharmacy Demo — secure prescription handling (demo only)</footer>
    </div>
  );
}

/* ---------------- sample data ---------------- */
/* ---------------- sample data (stable image links) ---------------- */
function sampleProducts() {
  return [
    {
      id: "p1",
      brand: "Dolo 650",
      generic: "Paracetamol",
      price: 20,
      image: "https://images.unsplash.com/photo-1577401132921-cb39bb0adcff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categories: ["General", "Fever"],
      symptoms: ["fever", "pain"],
      stock: 120,
      description: "Fast acting pain relief and fever reducer."
    },
    {
      id: "p2",
      brand: "Crocin Advance",
      generic: "Paracetamol",
      price: 35,
      image: "https://images.unsplash.com/photo-1700104494865-200e961d942c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categories: ["General", "Fever"],
      symptoms: ["fever"],
      stock: 60,
      description: "Trusted brand for headaches & fever."
    },
    {
      id: "p3",
      brand: "Vicks VapoRub",
      generic: "Menthol/Camphor",
      price: 95,
      image: "https://images.unsplash.com/photo-1627467959547-8e44da7aa00a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categories: ["Cold & Cough"],
      symptoms: ["cough", "congestion"],
      stock: 45,
      description: "Soothes cough & congestion."
    },
    {
      id: "p4",
      brand: "Candid",
      generic: "Fluconazole",
      price: 220,
      image: "https://images.unsplash.com/photo-1715868655465-2276c4f93f1b?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categories: ["Skin"],
      symptoms: ["fungal"],
      stock: 12,
      description: "Antifungal tablet for infections."
    },
    {
      id: "p5",
      brand: "Himalaya Liv.52",
      generic: "Herbal",
      price: 260,
      image: "https://images.unsplash.com/photo-1522335579687-9c718c5184d7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categories: ["Liver Care"],
      symptoms: ["liver"],
      stock: 80,
      description: "Supports liver health."
    },
    {
      id: "p6",
      brand: "Amoxicillin 500mg",
      generic: "Amoxicillin",
      price: 120,
      image: "https://images.unsplash.com/photo-1607077792448-17b60bcca65f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categories: ["Infection"],
      symptoms: ["infection"],
      stock: 0,
      description: "Broad spectrum antibiotic."
    },
    {
      id: "p7",
      brand: "Gaviscon",
      generic: "Alginate",
      price: 180,
      image: "https://images.unsplash.com/photo-1686831889330-b059693080dd?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categories: ["Digestive"],
      symptoms: ["acidity", "stomach"],
      stock: 30,
      description: "Relief from heartburn & acidity."
    },
    {
      id: "p8",
      brand: "Dettol Antiseptic",
      generic: "Chloroxylenol",
      price: 150,
      image: "https://images.unsplash.com/photo-1519666251146-8e16c5518edd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categories: ["Personal Care"],
      symptoms: ["wound"],
      stock: 200,
      description: "Disinfectant for wounds and surfaces."
    }
  ];
}

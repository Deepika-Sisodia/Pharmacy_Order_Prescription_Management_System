import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Verification from "./pages/Verification";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Billing from "./pages/Billing";

function PharmacistApp() {
  const [selected, setSelected] = useState("Dashboard");
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "John Doe",
      address: "123 Main St, Springfield",
      medicines: ["Paracetamol", "Vitamin C"],
      date: "2025-01-15",
      prescriptionImage: "https://i.ibb.co/djymS1k/prescription-sample.jpg",
      doctor: "Dr. Smith",
      status: "pending",
      verified: false,
      bill: null,
      deliveryAgent: null,
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      address: "456 Oak Ave, Metropolis",
      medicines: ["Ibuprofen"],
      date: "2025-01-14",
      prescriptionImage: "https://i.ibb.co/djymS1k/prescription-sample.jpg",
      doctor: "Dr. Johnson",
      status: "pending",
      verified: false,
      bill: null,
      deliveryAgent: null,
    },
    {
      id: "ORD003",
      customer: "Mike Johnson",
      address: "789 Pine Ln, Gotham",
      medicines: ["Amoxicillin", "Cough Syrup"],
      date: "2025-01-13",
      prescriptionImage: "https://i.ibb.co/djymS1k/prescription-sample.jpg",
      doctor: "Dr. Lee",
      status: "pending",
      verified: false,
      bill: null,
      deliveryAgent: null,
    },
  ]);

  const [inventory, setInventory] = useState([
    { id: 1, name: "Paracetamol", quantity: 100, price: 5, expiry: "2026-12-01" },
    { id: 2, name: "Ibuprofen", quantity: 80, price: 8, expiry: "2026-10-01" },
    { id: 3, name: "Amoxicillin", quantity: 50, price: 12, expiry: "2026-09-01" },
    { id: 4, name: "Vitamin C", quantity: 120, price: 3, expiry: "2027-01-01" },
    { id: 5, name: "Cough Syrup", quantity: 40, price: 6, expiry: "2025-08-01" },
  ]);

  const handleVerifyOrder = (orderId, verified) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, verified, status: verified ? "approved" : "rejected" } : o
      )
    );
  };

  const handleGenerateBill = (orderId, billData) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, bill: billData, status: "billed" } : o
      )
    );
  };

  const handleAssignDelivery = (orderId, agent) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, deliveryAgent: agent, status: "assigned" } : o
      )
    );
  };

  const handleDeductInventory = (medicines) => {
    setInventory(
      inventory.map((item) => {
        const used = medicines.filter((m) => m.name === item.name);
        if (used.length > 0) {
          return { ...item, quantity: Math.max(0, item.quantity - used[0].quantity) };
        }
        return item;
      })
    );
  };

  return (
    <div className="flex">
      <Sidebar selected={selected} setSelected={setSelected} />
      <div className="ml-64 w-full min-h-screen bg-gray-50">
        <Topbar />
        <div className="p-6">
          {selected === "Dashboard" && (
            <Dashboard orders={orders} inventory={inventory} />
          )}
          {selected === "Verification" && (
            <Verification orders={orders} onVerify={handleVerifyOrder} />
          )}
          {selected === "Orders" && (
            <Orders
              orders={orders}
              onAssignDelivery={handleAssignDelivery}
              onDeductInventory={handleDeductInventory}
            />
          )}
          {selected === "Billing" && (
            <Billing
              orders={orders}
              inventory={inventory}
              onGenerateBill={handleGenerateBill}
            />
          )}
          {selected === "Inventory" && <Inventory inventory={inventory} />}
        </div>
      </div>
    </div>
  );
}

export default PharmacistApp;

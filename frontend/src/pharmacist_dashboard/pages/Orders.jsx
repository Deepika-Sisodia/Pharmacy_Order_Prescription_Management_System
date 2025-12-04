import { useState } from "react";

const Orders = ({ orders, onAssignDelivery, onDeductInventory }) => {
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const deliveryAgents = [
    { id: 1, name: "Agent A", phone: "555-0101", area: "Downtown" },
    { id: 2, name: "Agent B", phone: "555-0102", area: "Uptown" },
    { id: 3, name: "Agent C", phone: "555-0103", area: "Suburbs" },
  ];

  const handleAssign = (agent) => {
    onAssignDelivery(selectedOrder.id, agent);
    onDeductInventory(
      selectedOrder.medicines.map((name) => ({ name, quantity: 1 }))
    );
    alert(
      `Order assigned to ${agent.name}. Inventory deducted automatically.`
    );
    setShowDeliveryModal(false);
  };

  const approvedOrders = orders.filter((o) => o.verified && o.status !== "assigned");

  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-900 mb-6">Order Management</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-teal-700 text-white">
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Medicines</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {approvedOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-teal-700">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4 text-sm">{order.address}</td>
                <td className="p-4">{order.medicines.join(", ")}</td>
                <td className="p-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDeliveryModal(true);
                    }}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-semibold"
                  >
                    Assign Delivery
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delivery Assignment Modal */}
      {showDeliveryModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold text-teal-900 mb-4">
              Assign Delivery - {selectedOrder.id}
            </h2>

            <div className="space-y-3 mb-6">
              {deliveryAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="border border-gray-300 rounded-lg p-4 hover:bg-teal-50 cursor-pointer transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-teal-900">{agent.name}</p>
                      <p className="text-sm text-gray-600">{agent.phone}</p>
                      <p className="text-sm text-gray-600">Area: {agent.area}</p>
                    </div>
                    <button
                      onClick={() => handleAssign(agent)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded font-semibold text-sm"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowDeliveryModal(false)}
              className="w-full bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {approvedOrders.length === 0 && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center">
          <p className="text-blue-700 font-semibold text-lg">
            ✓ All approved orders have been assigned for delivery.
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;

import { useState } from "react";

const Verification = ({ orders, onVerify }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showModal, setShowModal] = useState(false);

  const pendingOrders = orders.filter((o) => !o.verified);

  const handleApprove = (orderId) => {
    onVerify(orderId, true);
    alert("Order approved successfully!");
  };

  const handleReject = (orderId) => {
    if (rejectReason.trim()) {
      onVerify(orderId, false);
      alert(`Order rejected: ${rejectReason}`);
      setRejectReason("");
      setShowModal(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-900 mb-6">Prescription Verification</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pendingOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-teal-700 text-white p-4">
              <h3 className="text-lg font-bold">{order.id}</h3>
              <p className="text-sm text-teal-100">{order.customer}</p>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs text-gray-500 font-semibold">Doctor</label>
                <p className="font-semibold text-gray-800">{order.doctor}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-semibold">Medicines</label>
                <p className="text-gray-700">{order.medicines.join(", ")}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-semibold">Date</label>
                <p className="text-gray-700">{order.date}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-semibold">Prescription</label>
                <img
                  src={order.prescriptionImage}
                  alt="Prescription"
                  className="mt-2 w-full h-32 object-cover rounded"
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-2">
              <button
                onClick={() => handleApprove(order.id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
              >
                ✓ Approve
              </button>
              <button
                onClick={() => {
                  setSelectedOrder(order.id);
                  setShowModal(true);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
              >
                ✗ Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reject Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-xl font-bold text-teal-900 mb-4">Reject Order</h2>
            <textarea
              placeholder="Enter rejection reason (e.g., Script Expired, Invalid Doctor, etc.)"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-teal-500"
              rows="4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleReject(selectedOrder)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
              >
                Confirm Reject
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {pendingOrders.length === 0 && (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
          <p className="text-green-700 font-semibold text-lg">
            ✓ No pending prescriptions! All orders are verified.
          </p>
        </div>
      )}
    </div>
  );
};

export default Verification;

import { useState } from "react";

const Billing = ({ orders, inventory, onGenerateBill }) => {
  const [showBillModal, setShowBillModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [billDetails, setBillDetails] = useState(null);

  const approvedOrders = orders.filter((o) => o.verified && !o.bill);

  const generateBill = (order) => {
    const totalAmount = order.medicines.reduce((sum, medicineName) => {
      const med = inventory.find((i) => i.name === medicineName);
      return sum + (med ? med.price : 0);
    }, 0);

    const bill = {
      orderId: order.id,
      customer: order.customer,
      medicines: order.medicines.map((name) => {
        const med = inventory.find((i) => i.name === name);
        return { name, price: med?.price || 0, quantity: 1 };
      }),
      subtotal: totalAmount,
      tax: totalAmount * 0.1,
      total: totalAmount * 1.1,
      date: new Date().toLocaleDateString(),
    };

    setBillDetails(bill);
    setSelectedOrder(order);
    setShowBillModal(true);
  };

  const confirmBill = () => {
    onGenerateBill(selectedOrder.id, billDetails);
    alert("Bill generated and order marked for delivery!");
    setShowBillModal(false);
    setBillDetails(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-900 mb-6">Billing & Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {approvedOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-600">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-teal-900">{order.id}</h3>
              <p className="text-gray-600">{order.customer}</p>
              <p className="text-sm text-gray-500">{order.address}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-teal-800 mb-2">Medicines:</h4>
              <ul className="space-y-1">
                {order.medicines.map((med) => {
                  const item = inventory.find((i) => i.name === med);
                  return (
                    <li key={med} className="text-sm text-gray-700">
                      {med} - ₹{item?.price || "N/A"}
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              onClick={() => generateBill(order)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded font-semibold"
            >
              Generate Bill
            </button>
          </div>
        ))}
      </div>

      {/* Bill Modal */}
      {showBillModal && billDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-xl">
            <div className="bg-gradient-to-r from-teal-800 to-teal-600 text-white p-4 rounded mb-6">
              <h2 className="text-2xl font-bold">Invoice</h2>
              <p className="text-teal-100">Order: {billDetails.orderId}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="font-semibold text-gray-800">{billDetails.customer}</p>
                <p className="text-sm text-gray-600">{billDetails.date}</p>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left p-2">Medicine</th>
                    <th className="text-center p-2">Qty</th>
                    <th className="text-right p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {billDetails.medicines.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="p-2">{item.name}</td>
                      <td className="text-center p-2">{item.quantity}</td>
                      <td className="text-right p-2">₹{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="border-t-2 border-gray-300 pt-4 space-y-2 text-right">
                <div>
                  <span className="font-semibold text-gray-700">Subtotal:</span>
                  <span className="float-right">₹{billDetails.subtotal.toFixed(2)}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Tax (10%):</span>
                  <span className="float-right">₹{billDetails.tax.toFixed(2)}</span>
                </div>
                <div className="bg-teal-100 p-2 rounded">
                  <span className="font-bold text-teal-900">Total:</span>
                  <span className="float-right font-bold text-teal-900">
                    ₹{billDetails.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={confirmBill}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded font-semibold"
              >
                Confirm & Send to Delivery
              </button>
              <button
                onClick={() => setShowBillModal(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-3 rounded font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {approvedOrders.length === 0 && (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
          <p className="text-green-700 font-semibold text-lg">
            ✓ All orders have been billed and sent for delivery.
          </p>
        </div>
      )}
    </div>
  );
};

export default Billing;

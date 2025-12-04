import StatsCard from "../components/StatsCard";

const Dashboard = ({ orders, inventory }) => {
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const approvedCount = orders.filter((o) => o.verified).length;
  const assignedCount = orders.filter((o) => o.deliveryAgent).length;
  const lowStockCount = inventory.filter((i) => i.quantity < 30).length;

  return (
    <div>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-600 text-white p-6 rounded-lg mb-6 shadow-lg">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-teal-100 mt-2">
          You have <span className="font-bold">{pendingCount} pending orders</span> awaiting verification. Process them quickly.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Pending Verification"
          count={pendingCount}
          icon="⏳"
          color="yellow"
        />
        <StatsCard
          title="Verified Orders"
          count={approvedCount}
          icon="✓"
          color="green"
        />
        <StatsCard
          title="Assigned for Delivery"
          count={assignedCount}
          icon="🚚"
          color="blue"
        />
        <StatsCard
          title="Low Stock Items"
          count={lowStockCount}
          icon="⚠️"
          color="red"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-teal-900 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-teal-200">
                <th className="text-left p-3 text-teal-800 font-semibold">Order ID</th>
                <th className="text-left p-3 text-teal-800 font-semibold">Customer</th>
                <th className="text-left p-3 text-teal-800 font-semibold">Status</th>
                <th className="text-left p-3 text-teal-800 font-semibold">Verified</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold text-teal-700">{order.id}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">{order.verified ? "✓ Yes" : "✗ No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

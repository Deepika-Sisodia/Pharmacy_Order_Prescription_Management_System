import { useState } from "react";

const Inventory = ({ inventory }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLowStock, setFilterLowStock] = useState(false);

  const filtered = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterLowStock ? item.quantity < 30 : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-900 mb-6">Inventory Management</h1>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
          />
          <button
            onClick={() => setFilterLowStock(!filterLowStock)}
            className={`px-4 py-2 rounded font-semibold transition ${
              filterLowStock
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {filterLowStock ? "📍 Low Stock" : "Filter Low Stock"}
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-teal-700 text-white">
              <th className="p-4 text-left">Medicine Name</th>
              <th className="p-4 text-center">Current Stock</th>
              <th className="p-4 text-center">Price (₹)</th>
              <th className="p-4 text-center">Expiry Date</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold text-teal-900">{item.name}</td>
                <td className="p-4 text-center font-bold">{item.quantity}</td>
                <td className="p-4 text-center">₹{item.price}</td>
                <td className="p-4 text-center text-sm text-gray-600">{item.expiry}</td>
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.quantity < 20
                        ? "bg-red-100 text-red-700"
                        : item.quantity < 50
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.quantity < 20
                      ? "Critical"
                      : item.quantity < 50
                      ? "Low"
                      : "In Stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-700 font-semibold">Total Items</p>
          <p className="text-3xl font-bold text-green-800">{inventory.length}</p>
        </div>
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-700 font-semibold">Low Stock Items</p>
          <p className="text-3xl font-bold text-yellow-800">
            {inventory.filter((i) => i.quantity < 50).length}
          </p>
        </div>
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-700 font-semibold">Critical Items</p>
          <p className="text-3xl font-bold text-red-800">
            {inventory.filter((i) => i.quantity < 20).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

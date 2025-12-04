import { useState, useEffect } from 'react';
import api from '../api';

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/delivery/my');
      setOrders(response.data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleDeliver = async (orderId) => {
    try {
      await api.patch(`/delivery/${orderId}/deliver`);
      setMessage('Order marked as delivered');
      fetchOrders();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to mark as delivered');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      approved: '#3498db',
      rejected: '#e74c3c',
      assigned: '#9b59b6',
      delivered: '#27ae60',
    };
    return colors[status] || '#7f8c8d';
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>Delivery Dashboard</h2>
      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}

      {orders.length === 0 ? (
        <div className="card">
          <p>No assigned orders</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-8)}</td>
                <td>
                  {order.customerId?.name || 'N/A'}
                  <br />
                  <small>{order.customerId?.email || 'N/A'}</small>
                </td>
                <td>
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      {item.medicineId?.name || 'N/A'} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td>₹{order.total.toFixed(2)}</td>
                <td>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      backgroundColor: getStatusColor(order.status),
                      color: 'white',
                      fontSize: '0.9rem',
                    }}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {order.status === 'assigned' && (
                    <button
                      className="success"
                      onClick={() => handleDeliver(order._id)}
                    >
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeliveryDashboard;
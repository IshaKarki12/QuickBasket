// src/pages/OrderManagementPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./OrderManagementPage.css";

function OrderManagementPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/orders");
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (id, newStatus) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/api/admin/orders/${id}`, {
        status: newStatus,
      });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: data.status } : order
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="order-management-container">
      <h2>Order Management</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user?.name || order.user?.email || "Guest"}</td>
                <td>
                  {(order.products || []).map((item) => (
                    <div key={item.product?._id || Math.random()}>
                      {item.product?.name || "Unknown"} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td>
                  Rs.{" "}
                  {(order.products || []).reduce(
                    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
                    0
                  ).toFixed(2)}
                </td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderManagementPage;

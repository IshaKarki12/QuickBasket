import { useEffect, useState } from "react";
import axios from "axios";
import "./OrderManagementPage.css";

function OrderManagementPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/admin/orders/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
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
              <th>Order ID</th>
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
                <td>{order._id}</td>
                {/* ✅ Always show name if available, fallback to email */}
                <td>
                  {order.user
                    ? order.user.name || order.user.email
                    : "Unknown"}
                </td>

                <td>
                  {(order.products || []).map((item, idx) => (
                    <div key={idx}>
                      {item.product?.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td>Rs. {order.total?.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
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

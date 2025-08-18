import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../index.css"; 

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [latestOrders, setLatestOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats
        const statsRes = await axios.get("http://localhost:5000/api/admin/stats");
        console.log("Stats response:", statsRes.data); // DEBUG
        setStats({
          totalProducts: statsRes.data.totalProducts || 0,
          totalOrders: statsRes.data.totalOrders || 0,
          totalRevenue: Number(statsRes.data.totalRevenue) || 0,
        });

        // Fetch latest orders
        const ordersRes = await axios.get("http://localhost:5000/api/admin/orders");
        console.log("Orders response:", ordersRes.data); // DEBUG
        setLatestOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError("Failed to load admin dashboard data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-dashboard-page">
      <h2 className="section-title">Admin Dashboard</h2>

      {/* Summary Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>Rs. {stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Latest Orders */}
      <div className="latest-orders">
        <h3>Latest Orders</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.length === 0 ? (
                <tr>
                  <td colSpan="4">No recent orders</td>
                </tr>
              ) : (
                latestOrders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.customerName || "Unknown"}</td>
                    <td>Rs. {Number(order.total).toFixed(2)}</td>
                    <td>{order.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation */}
      <div className="dashboard-actions">
        <Link to="/admin/products">
          <button className="checkout-btn">Go to Product Management</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;

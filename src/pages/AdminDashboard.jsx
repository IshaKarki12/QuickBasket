// frontend/src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

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
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const statsRes = await axios.get("http://localhost:5000/api/admin/stats");
        setStats({
          totalProducts: statsRes.data.totalProducts || 0,
          totalOrders: statsRes.data.totalOrders || 0,
          totalRevenue: Number(statsRes.data.totalRevenue) || 0,
        });

        const ordersRes = await axios.get("http://localhost:5000/api/admin/orders");
        setLatestOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className="loading-text">Loading dashboard...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="admin-dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-cards">
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
      <div className="latest-orders-section">
        <h2>Latest Orders</h2>
        {latestOrders.length === 0 ? (
          <p>No recent orders.</p>
        ) : (
          <div className="table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {latestOrders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.customerName || "Unknown"}</td>
                    <td>Rs. {Number(order.total).toFixed(2)}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    {/* Navigation Buttons */}
<div className="dashboard-actions">
  <Link to="/admin/products">
    <button className="products-btn">Manage Products</button>
  </Link>

  <Link to="/admin/orders">
    <button className="orders-btn">Manage Orders</button>
  </Link>

  <Link to="/admin/users">
    <button className="users-btn">Manage Users</button>
  </Link>
</div>

    </div>
  );
}

export default AdminDashboard;

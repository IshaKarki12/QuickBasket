// frontend/src/components/AdminDashboard.jsx
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const statsRes = await axios.get("http://localhost:5000/api/admin/stats", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setStats({
          totalProducts: statsRes.data.totalProducts || 0,
          totalOrders: statsRes.data.totalOrders || 0,
          totalRevenue: Number(statsRes.data.totalRevenue) || 0,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="loading-text">Loading dashboard...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="admin-dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* ✅ Stats Cards */}
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

      {/* ✅ Navigation Buttons */}
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

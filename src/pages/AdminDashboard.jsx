import React from "react";
import { Link } from "react-router-dom";
import "../index.css"; // Make sure the CSS includes the dashboard styles

function AdminDashboard() {
  // Mock data
  const stats = {
    totalProducts: 45,
    totalOrders: 12,
    totalRevenue: 2350.75,
  };

  const latestOrders = [
    { id: 101, customer: "John Doe", total: 120.5, status: "Pending" },
    { id: 102, customer: "Jane Smith", total: 80.0, status: "Completed" },
    { id: 103, customer: "Mike Johnson", total: 45.25, status: "Shipped" },
  ];

  return (
    <div className="admin-dashboard-page">
      <h2 className="section-title">Admin Dashboard</h2>

      {/* Summary Stats */}
      <div className="dashboard-stats">
        {Object.entries(stats).map(([key, value]) => (
          <div className="stat-card" key={key}>
            <h3>{key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}</h3>
            <p>{key === "totalRevenue" ? `Rs. ${value.toFixed(2)}` : value}</p>
          </div>
        ))}
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
              {latestOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>Rs. {order.total.toFixed(2)}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
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

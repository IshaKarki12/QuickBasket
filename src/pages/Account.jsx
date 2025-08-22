import React from "react";
import { useAuth } from "../context/authContext.jsx";
import "./Account.css";

function Account() {
  const { user } = useAuth();

  if (!user) return <p>Please log in to view your account.</p>;

  return (
    <div className="account-page">
      <h2>My Account</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

export default Account;

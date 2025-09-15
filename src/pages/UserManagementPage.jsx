import { useEffect, useState } from "react";
import axios from "axios";
import "./UserManagementPage.css";

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Update role
  const updateRole = async (id, role) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/admin/users/${id}`,
        { role },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: data.role } : user
        )
      );
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  // Add new user
  const addUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/users",
        form,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setUsers((prev) => [data, ...prev]); // add new user to state
      setSuccess("User added successfully!");
      setForm({ name: "", email: "", password: "", role: "user" }); // reset form
    } catch (err) {
      console.error("Error adding user:", err);
      setError(err.response?.data?.message || "Failed to add user");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="user-management-container">
      <h2>User Management</h2>

      {/* Add New User Form */}
      <form className="add-user-form" onSubmit={addUser}>
        <h3>Add New User</h3>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      {/* User Table */}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const currentRole = user.role || "user";
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={currentRole}
                      onChange={(e) => updateRole(user._id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserManagementPage;

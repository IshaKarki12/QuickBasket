import React, { useState } from "react";
import "./AdminStyles.css"; // new CSS file for admin pages

const initialProducts = [
  { id: 1, name: "Apple", price: 1.2, category: "Fruits" },
  { id: 2, name: "Milk", price: 0.85, category: "Dairy" },
  { id: 3, name: "Bread", price: 1.5, category: "Bakery" },
];

function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState({ name: "", price: "", category: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      setProducts(
        products.map((p) =>
          p.id === editId ? { ...p, ...form, price: parseFloat(form.price) } : p
        )
      );
      setEditId(null);
    } else {
      const newProduct = {
        id: Date.now(),
        ...form,
        price: parseFloat(form.price),
      };
      setProducts([...products, newProduct]);
    }
    setForm({ name: "", price: "", category: "" });
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
    });
    setEditId(product.id);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Product Management</h2>

      {/* Form */}
      <div className="admin-card">
        <form className="admin-form" onSubmit={handleAddOrEdit}>
          <div>
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (Rs.)</th>
              <th>Category</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td className="action-buttons">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;

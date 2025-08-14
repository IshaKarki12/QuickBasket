import React, { useState } from "react";
import "../index.css";

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
      // Edit product
      setProducts(products.map(p => p.id === editId ? { ...p, ...form, price: parseFloat(form.price) } : p));
      setEditId(null);
    } else {
      // Add new product
      const newProduct = { id: Date.now(), ...form, price: parseFloat(form.price) };
      setProducts([...products, newProduct]);
    }
    setForm({ name: "", price: "", category: "" });
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price, category: product.category });
    setEditId(product.id);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="product-management-page">
      <h2 className="section-title">Product Management</h2>

      {/* Form */}
      <form className="product-form" onSubmit={handleAddOrEdit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Product Name" 
          value={form.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="price" 
          placeholder="Price" 
          value={form.price} 
          onChange={handleChange} 
          step="0.01"
          required 
        />
        <input 
          type="text" 
          name="category" 
          placeholder="Category" 
          value={form.category} 
          onChange={handleChange} 
          required 
        />
        <button type="submit" className="checkout-btn">{editId ? "Update Product" : "Add Product"}</button>
      </form>

      {/* Product List */}
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: Rs. {product.price}</p>
            <p>Category: {product.category}</p>
            <div className="product-buttons">
              <button className="checkout-btn" onClick={() => handleEdit(product)}>Edit</button>
              <button className="remove-btn" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManagement;

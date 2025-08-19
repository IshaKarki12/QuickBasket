import { useEffect, useState } from "react";
import axios from "axios";

function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // product being edited
  const [showAddModal, setShowAddModal] = useState(false); // show add modal
  const [formData, setFormData] = useState({ name: "", price: "", category: "" });

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  // Open edit modal
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
    });
  };

  // Save edited product
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/products/${editingProduct._id}`, formData);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  // Open add new modal
  const handleAddNew = () => {
    setFormData({ name: "", price: "", category: "" });
    setShowAddModal(true);
  };

  // Save new product
  const handleAddSave = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/products", formData);
      setShowAddModal(false);
      fetchProducts();
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  return (
    <div>
      <h2>Product Management</h2>
      <button onClick={handleAddNew} style={{ marginBottom: "15px" }}>Add New Product</button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.category}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingProduct && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Edit Product</h3>
            <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <br />
            <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            <br />
            <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
            <br />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditingProduct(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Add New Modal */}
      {showAddModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Add New Product</h3>
            <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <br />
            <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            <br />
            <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
            <br />
            <button onClick={handleAddSave}>Add Product</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Modal styles
const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
};

export default ProductManagementPage;

// frontend/pages/CategoryProducts.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner"; 
import axios from "axios";
import './CategoryProducts.css';

function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setLoading(true);
    let filtered = products.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );

    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "low-high") filtered.sort((a,b)=>a.price-b.price);
    else if (sortOrder === "high-low") filtered.sort((a,b)=>b.price-a.price);
    else if (sortOrder === "name-az") filtered.sort((a,b)=>a.name.localeCompare(b.name));

    setFilteredProducts(filtered);
    setLoading(false);
  }, [products, category, searchTerm, sortOrder]);

  if (loading) return <Spinner />;

  return (
    <div className="category-products-page">
      <div className="category-banner">
        <h1>{category.toUpperCase()}</h1>
        <p>Discover our exclusive selection of {category.toLowerCase()} items!</p>
      </div>

      <div className="filters-container">
        <input
          type="text"
          placeholder="🔍 Search in this category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="name-az">Name: A → Z</option>
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products match your search 😢</p>
      )}
    </div>
  );
}

export default CategoryProducts;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import productsData from "../data/products";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner"; 
import './CategoryProducts.css';

function CategoryProducts() {
  const { category } = useParams();

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter products in this category & apply search/sort
  useEffect(() => {
    setLoading(true);

    let filtered = productsData.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );

    // Search filter
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting
    if (sortOrder === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "name-az") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    // simulate loading
    setTimeout(() => {
      setFilteredProducts(filtered);
      setLoading(false);
    }, 800); // 0.5s delay
  }, [category, searchTerm, sortOrder]);

  if (loading) return <Spinner />;

  return (
    <div className="category-products-page">

      {/* Banner */}
      <div className="category-banner">
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>
        <div className="floating-shape shape3"></div>
        <h1>{category.toUpperCase()}</h1>
        <p>Discover our exclusive selection of {category.toLowerCase()} items!</p>
      </div>

      {/* Filters Section */}
      <div className="filters-container">
        
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search in this category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="filter-select"
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="name-az">Name: A → Z</option>
        </select>

      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>Sorry! No products match your search.</p>
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;

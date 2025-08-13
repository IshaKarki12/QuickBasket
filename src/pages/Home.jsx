import { useState } from 'react';
import featuredProducts from '../data/featuredProducts'; // ✅ correct naming
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import '../index.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Filter only from featured products
  const filteredProducts = featuredProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Hero />
      <CategorySection />

      {/* 🔍 Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <section>
        <h2 className="section-title">🛍️ Featured Products</h2>
        <div className="product-list">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

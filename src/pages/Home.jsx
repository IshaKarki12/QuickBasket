import { useState } from 'react';
import products from '../data/products'; // ✅ All products
import featuredProducts from '../data/featuredProducts'; // ✅ For featured section
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import '../index.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Filter from all products
  const filteredProducts = products.filter(product =>
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

      {/* If search is active, show filtered results, else show featured */}
      <section>
        <h2 className="section-title">🛍️ {searchTerm ? 'Search Results' : 'Featured Products'}</h2>
        <div className="product-list">
          {(searchTerm ? filteredProducts : featuredProducts).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

import products from '../data/products';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import'../index.css';

function Home() {
  return (
    <div> 
       <Hero />
       <CategorySection/>
       <section>
        <h2 className="section-title">🛍️ Featured Products</h2>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

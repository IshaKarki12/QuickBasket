import { useParams } from "react-router-dom";
import productsData from "../data/products"; 
import ProductCard from "../components/ProductCard";
import './CategoryProducts.css';

function CategoryProducts() {
  const { category } = useParams();
  const filteredProducts = productsData.filter(
    product => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="category-products-page">
    <div className="category-banner">
  <div className="floating-shape shape1"></div>
  <div className="floating-shape shape2"></div>
  <h1>{category.toUpperCase()}</h1>
  <p>Discover our exclusive selection of {category.toLowerCase()} items!</p>
</div>
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>Sorry! No products found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;

import { useParams } from 'react-router-dom';
import products from '../data/products';
import './ProductDetail.css';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false); // track if product was added

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);

    // Reset button text after 2 seconds
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="product-detail-desc">
            {product.description || "No description available."}
          </p>
          <p className="product-detail-price">
            <strong>Price:</strong> ${product.price}
          </p>
          <button 
            className="product-detail-btn"
            onClick={handleAddToCart}
            disabled={added} // optional: prevent double-click while added
          >
            {added ? "Added! ✅" : "Add to Cart 🛒"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

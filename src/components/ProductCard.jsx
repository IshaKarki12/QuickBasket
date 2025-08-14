import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useState } from 'react';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false); // track if added

  // Handle Add to Cart click
  const handleAddToCartClick = (e) => {
    e.preventDefault(); // prevent link navigation
    addToCart(product);
    setAdded(true);

    // Reset after 2 seconds
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="product-card">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p className="product-price">${product.price}</p>
{product.unit && <p className="product-unit">{product.unit}</p>}

        <button 
          onClick={handleAddToCartClick} 
          disabled={added} // optional: prevent double click
        >
          {added ? "Added! ✅" : "Add to Cart 🛒"}
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;

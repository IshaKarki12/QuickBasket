import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Prevent the Link navigation when clicking Add to Cart button
  const handleAddToCartClick = (e) => {
    e.preventDefault(); // prevent link navigation
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="product-card">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        <button onClick={handleAddToCartClick}>Add to Cart</button>
      </div>
    </Link>
  );
}

export default ProductCard;

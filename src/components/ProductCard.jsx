import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link 
      to={`/product/${product.id}`} 
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="product-card">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        <button>Add to Cart</button>
      </div>
    </Link>
  );
}

export default ProductCard;

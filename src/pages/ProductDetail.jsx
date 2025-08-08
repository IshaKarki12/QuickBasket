import { useParams } from 'react-router-dom';
import products from '../data/products';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="product-detail-desc">{product.description || "No description available."}</p>
          <p className="product-detail-price"><strong>Price:</strong> ${product.price}</p>
          <button className="product-detail-btn">Add to Cart 🛒</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

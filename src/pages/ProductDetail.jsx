// src/pages/ProductDetail.jsx

import { useParams } from 'react-router-dom';
import products from '../data/products';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) return <div style={{ padding: '40px' }}>Product not found</div>;

  return (
    <div style={{ padding: '40px' }}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ width: '300px', borderRadius: '12px' }} />
      <p style={{ fontSize: '1.2rem', marginTop: '20px' }}>Price: ${product.price.toFixed(2)}</p>
      <button style={{ marginTop: '20px', padding: '10px 20px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '6px' }}>
        🛒 Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;

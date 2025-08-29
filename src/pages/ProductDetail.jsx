import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Spinner />;
  if (!product) return <h2>Product not found</h2>;

  const handleAddToCart = () => {
    addToCart({
      productId: product._id, // ✅ Use MongoDB _id
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-detail-image">
          <img src={product.imageUrl || "/default.jpg"} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="product-detail-desc">{product.description || "No description."}</p>
          <p className="product-detail-price">
            <strong>Price:</strong> Rs. {product.price}
          </p>
          <button
            className="product-detail-btn"
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? "Added! ✅" : "Add to Cart 🛒"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

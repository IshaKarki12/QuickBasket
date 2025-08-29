// frontend/src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "./Cart.css";

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Calculate total price safely
  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        userId: user._id, // MongoDB user ID
        products: cart.map(item => ({
          product: item.productId, // MongoDB product ID
          quantity: item.quantity,
        })),
      };

      const res = await axios.post("http://localhost:5000/api/orders", orderData);
      console.log("Order success:", res.data);
      alert("Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty 😢</p>
          <Link to="/" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.productId}>
                  <td>{item.name}</td>
                  <td>Rs. {item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateQuantity(item.productId, parseInt(e.target.value))
                      }
                      className="quantity-input"
                    />
                  </td>
                  <td>Rs. {(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Total: Rs. {totalPrice.toFixed(2)}</h3>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

// frontend/pages/Cart.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/authContext";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) return alert("Please login first");

    setLoading(true);
    try {
      const orderData = {
        userId: user._id,
        products: cart.map(item => ({ product: item.productId, quantity: item.quantity })),
      };
      await axios.post("http://localhost:5000/api/orders", orderData);
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
          <Link to="/">Shop Now</Link>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.productId}>
                  <td>{item.name}</td>
                  <td>Rs. {item.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                    />
                  </td>
                  <td>Rs. {item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: Rs. {totalPrice}</h3>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
}

export default Cart;

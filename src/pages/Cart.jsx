import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import "../index.css";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({ isOpen: false, type: "", itemId: null });

  const handleQuantityChange = (id, e) => {
    const val = e.target.value;
    const quantity = parseInt(val);

    if (val === "" || isNaN(quantity) || quantity < 1) {
      setErrors((prev) => ({ ...prev, [id]: "Quantity must be at least 1" }));
    } else {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      updateQuantity(id, quantity);
    }
  };

  const openPopup = (type, itemId = null) => {
    setPopup({ isOpen: true, type, itemId });
  };

  const closePopup = () => setPopup({ isOpen: false, type: "", itemId: null });

  const confirmAction = () => {
    if (popup.type === "remove" && popup.itemId !== null) removeFromCart(popup.itemId);
    else if (popup.type === "clear") clearCart();
    closePopup();
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2 className="cart-title">🛒 My Cart</h2>
        <div className="cart-empty">
          <h3>Your Cart is Empty</h3>
          <p>Start adding some items to your cart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-title">🛒 My Cart</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-info">
              <h4>{item.name}</h4>
              <p>Price: Rs. {item.price}</p>
              <label>
                Quantity:{" "}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e)}
                />
              </label>
              {errors[item.id] && <p className="error-message">{errors[item.id]}</p>}
              <p className="subtotal">Subtotal: Rs. {(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button className="remove-btn" onClick={() => openPopup("remove", item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: Rs. {totalPrice.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={() => openPopup("clear")}>
          Clear Cart
        </button>
      </div>

      {/* Popup overlay */}
      {popup.isOpen && (
        <div className="popup-backdrop">
          <div className="popup-confirmation">
            <p>{popup.type === "remove" ? "Remove this item?" : "Clear all items?"}</p>
            <div className="popup-buttons">
              <button className="btn-confirm" onClick={confirmAction}>
                Yes
              </button>
              <button className="btn-cancel" onClick={closePopup}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

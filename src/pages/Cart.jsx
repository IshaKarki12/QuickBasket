import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import "../index.css";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Track errors per item ID for quantity validation
  const [errors, setErrors] = useState({});

  // Track modal state
  const [modal, setModal] = useState({ isOpen: false, type: "", itemId: null });

  // Handle quantity input changes with validation
  const handleQuantityChange = (id, e) => {
    const val = e.target.value;
    const quantity = parseInt(val);

    if (val === "" || isNaN(quantity) || quantity < 1) {
      // Set error for this item
      setErrors((prev) => ({ ...prev, [id]: "Quantity must be at least 1" }));
    } else {
      // Clear error and update quantity
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      updateQuantity(id, quantity);
    }
  };

  // Open confirmation modal
  const openModal = (type, itemId = null) => {
    setModal({ isOpen: true, type, itemId });
  };

  // Close modal
  const closeModal = () => {
    setModal({ isOpen: false, type: "", itemId: null });
  };

  // Confirm modal action
  const confirmAction = () => {
    if (modal.type === "remove" && modal.itemId !== null) {
      removeFromCart(modal.itemId);
    } else if (modal.type === "clear") {
      clearCart();
    }
    closeModal();
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
              {errors[item.id] && (
                <p className="error-message">{errors[item.id]}</p>
              )}

              <p className="subtotal">Subtotal: Rs. {(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <button
              className="remove-btn"
              onClick={() => openModal("remove", item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: Rs. {totalPrice.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={() => openModal("clear")}>
          Clear Cart
        </button>
      </div>

      {/* Confirmation Modal */}
      {modal.isOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>
              {modal.type === "remove"
                ? "Are you sure you want to remove this item?"
                : "Are you sure you want to clear the entire cart?"}
            </p>
            <div className="modal-buttons">
              <button onClick={confirmAction}>Yes</button>
              <button onClick={closeModal}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

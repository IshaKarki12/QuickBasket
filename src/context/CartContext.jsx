// frontend/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext.jsx";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth(); // get logged-in user
  const [cart, setCart] = useState([]);

  // Fetch cart from backend when user logs in
  useEffect(() => {
    if (!user || !token) {
      setCart([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data.cart || []);
      } catch (error) {
        console.error("Failed to fetch cart:", error.response?.data || error.message);
      }
    };

    fetchCart();
  }, [user, token]);

  // Sync cart with backend
  const syncCart = async (updatedCart) => {
    if (!user || !token) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart",
        { cart: updatedCart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Cart synced:", res.data.cart);
    } catch (error) {
      console.error("Failed to update cart:", error.response?.data || error.message);
    }
  };

  const addToCart = (product) => {
    if (!user) return alert("Please login first");
    if (!product.id) return console.error("Product missing id:", product);

    const existingItem = cart.find((item) => item.productId === product.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image || "",
        },
      ];
    }

    setCart(updatedCart);
    syncCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    syncCart(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return;
    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    syncCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    syncCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

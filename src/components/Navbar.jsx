// frontend/src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { useAuth } from "../context/authContext.jsx";
import { useCart } from "../context/CartContext.jsx";

function Navbar({ isAdmin }) {
  const { user, logout } = useAuth();
  const { cart } = useCart(); // ✅ get cart from context
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Count cart items
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""} ${
        isAdmin ? "admin-navbar" : "user-navbar"
      }`}
    >
      <div className="navbar-container">
        {/* ✅ Logo */}
        <Link to="/" className="navbar-logo">
          QuickBasket
        </Link>

        {/* ✅ Links */}
        <ul className="navbar-links">
          {!isAdmin ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <Link to="/cart" className="cart-link">
                  Cart
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/admin/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/admin/products">Products</Link>
              </li>
              <li>
                <Link to="/admin/orders">Orders</Link>
              </li>
              <li>
                <Link to="/admin/users">Users</Link>
              </li>
            </>
          )}

          {/* ✅ Auth buttons */}
          {user ? (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

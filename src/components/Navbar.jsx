import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { useAuth } from "../context/authContext.jsx";
import { useCart } from "../context/CartContext.jsx";

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ get current path
  const [scrolled, setScrolled] = useState(false);

  const isAdmin = user?.role === "admin";

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

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // ✅ Function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""} ${
        isAdmin ? "admin-navbar" : "user-navbar"
      }`}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          QuickBasket
        </Link>

        <ul className="navbar-links">
          {!isAdmin ? (
            <>
              <li>
                <Link
                  to="/"
                  className={isActive("/") ? "active-link" : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={isActive("/about") ? "active-link" : ""}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={isActive("/contact") ? "active-link" : ""}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className={isActive("/account") ? "active-link" : ""}
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className={`cart-link ${isActive("/cart") ? "active-link" : ""}`}
                >
                  Cart
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/admin/dashboard"
                  className={isActive("/admin/dashboard") ? "active-link" : ""}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className={isActive("/admin/products") ? "active-link" : ""}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className={isActive("/admin/orders") ? "active-link" : ""}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className={isActive("/admin/users") ? "active-link" : ""}
                >
                  Users
                </Link>
              </li>
            </>
          )}

          {user ? (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className={isActive("/login") ? "active-link" : ""}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

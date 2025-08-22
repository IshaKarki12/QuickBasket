// Navbar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';
import userIcon from '../assets/user.png';
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/authContext.jsx";
import carticon from '../assets/add-to-cart.png';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">QuickBasket</div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
      </div>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => setMenuOpen(false)}>About</Link>

        {/* User Account */}
        <Link to={user ? "/account" : "/login"} className="icon-link" onClick={() => setMenuOpen(false)}>
          {user ? (
            <div className="user-badge">
              <img src={userIcon} alt="User" style={{ width: '28px', marginRight: '8px', borderRadius: '50%' }} />
              <span>{user.name}</span>
            </div>
          ) : (
            <img src={userIcon} alt="Login" style={{ width: '28px' }} />
          )}
        </Link>

        {user && (
          <span className="logout-btn" onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '10px' }}>
            Logout
          </span>
        )}

        {/* Cart */}
        <Link to="/cart" className="cart-link" onClick={() => setMenuOpen(false)} style={{ position: "relative" }}>
          <img src={carticon} alt="Cart Icon" style={{ width: '28px', verticalAlign: 'middle' }} />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

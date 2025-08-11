import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';
import user from '../assets/user.png';
import { useCart } from "../context/CartContext.jsx";
import carticon from '../assets/add-to-cart.png';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();

  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      {/* Left side */}
      <div className="navbar-left">
        <div className="navbar-cart">🛒</div>  {/* Cart icon first */}
        <div className="navbar-logo">QuickBasket</div>
        {/* Hamburger menu for mobile */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {/* Right side links */}
      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link
          to="/"
          className={location.pathname === '/' ? 'active' : ''}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/contact"
          className={location.pathname === '/contact' ? 'active' : ''}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
        <Link
          to="/about"
          className={location.pathname === '/about' ? 'active' : ''}
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>

        {/* Icons */}
        <Link
          to="/account"
          className="icon-link"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={user}
            alt="My Account"
            style={{ width: '28px', marginRight: '8px' }}
          />
        </Link>
        <Link
          to="/cart"
          className="cart-link"
          onClick={() => setMenuOpen(false)}
          style={{ position: "relative" }}
        >
          <img
            src={carticon}
            alt="Cart Icon"
            style={{ width: '28px', verticalAlign: 'middle' }}
          />
          {totalItems > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: 'red',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                fontWeight: 'bold',
                lineHeight: 1,
                minWidth: '20px',
                textAlign: 'center',
                pointerEvents: 'none',
                userSelect: 'none'
              }}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

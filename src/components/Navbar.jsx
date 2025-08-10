import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';
import cart from '../assets/add-to-cart.png';
import user from '../assets/user.png';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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
        >
          <img 
            src={cart} 
            alt="Cart Icon" 
            style={{ width: '28px', verticalAlign: 'middle' }} 
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

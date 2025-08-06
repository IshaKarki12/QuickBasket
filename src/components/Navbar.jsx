import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import cart from '../assets/add-to-cart.png';


function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-cart">🛒</div>  {/* Cart icon first */}
        <div className="navbar-logo">QuickBasket</div>
      </div>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
        <Link to="/cart" className="cart-link">
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

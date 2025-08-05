import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

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
      </div>
    </nav>
  );
}

export default Navbar;

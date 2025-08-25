// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Account from './pages/Account';
import Cart from './pages/Cart';
import CategoryProducts from './pages/CategoryProducts';
import ProductDetail from './pages/ProductDetail';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ProductManagement from './pages/ProductManagement';
import Register from './pages/Register';
import OrderManagementPage from './pages/OrderManagementPage';
import { AuthProvider } from './context/authContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:category" element={<CategoryProducts />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<ProductManagement />} />
            <Route path="/admin/orders" element={<OrderManagementPage />} />
    
          </Routes>
          <ScrollToTopButton />
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

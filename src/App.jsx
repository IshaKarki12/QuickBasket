import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { AuthProvider, useAuth } from "./context/authContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetail from "./pages/ProductDetail";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ProductManagement from "./pages/ProductManagement";
import OrderManagementPage from "./pages/OrderManagementPage";
import UserManagementPage from "./pages/UserManagementPage.jsx";

// Wrapper for routes and admin redirect
function AppContent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.role === "admin" && (location.pathname === "/" || location.pathname === "/login")) {
      navigate("/admin/dashboard");
    }
  }, [user, location.pathname, navigate]);

  return (
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
      <Route path="/admin/users" element={<UserManagementPage />} />
    </Routes>
  );
}

// ✅ Main App
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ConditionalNavbar />
          <div className="main-content">
            <AppContent />
          </div>
          <ScrollToTopButton />
          <ConditionalFooter /> {/* footer handled conditionally */}
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

// ✅ Conditional Navbar
function ConditionalNavbar() {
  const location = useLocation();
  const hideNavPaths = ["/login", "/register"]; // paths where navbar should be hidden

  if (hideNavPaths.includes(location.pathname)) {
    return null; // don't render navbar
  }

  return <Navbar />;
}

// ✅ Conditional Footer
function ConditionalFooter() {
  const location = useLocation();
  const hideFooterPaths = ["/login", "/register"]; // paths where footer should be hidden

  if (hideFooterPaths.includes(location.pathname)) {
    return null; // don't render footer
  }

  return <Footer />;
}

export default App;

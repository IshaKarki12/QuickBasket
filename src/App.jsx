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


function App() {
  return (
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
</Routes>
       <Footer /> 
    </Router>
  );
}

export default App;

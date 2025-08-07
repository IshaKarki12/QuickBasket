import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Account from './pages/Account';
import Cart from './pages/Cart';
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
        <Route path="/cart" element={<Cart/>} />
        
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
       <Footer /> 
    </Router>
  );
}

export default App;

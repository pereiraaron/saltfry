import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import AboutScreen from './screens/AboutScreen/AboutScreen';
import ErrorScreen from './screens/ErrorPage/ErrorScreen';
import ProductScreen from './screens/ProductScreen/ProductScreen';
import CartScreen from './screens/CartScreen/CartScreen';
import ProductListScreen from './screens/ProductListScreen/ProductListScreen';
import CheckoutScreen from './screens/CheckoutScreen/CheckoutScreen';

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/checkout" element={<CheckoutScreen />} />
        <Route path="/cart/:id?" element={<CartScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/products/:id" element={<ProductScreen />} />
        <Route path="/products" element={<ProductListScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="*" element={<ErrorScreen />} />
      </Routes>
    </Router>
  );
}

export default App;


import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Loading from './components/Loading/Loading';
import { HomeScreen } from './screens/HomeScreen';

const LoginScreen = lazy(() =>
  import('./screens/LoginScreen').then((m) => ({ default: m.LoginScreen }))
);
const RegisterScreen = lazy(() =>
  import('./screens/RegisterScreen').then((m) => ({ default: m.RegisterScreen }))
);
const AboutScreen = lazy(() =>
  import('./screens/AboutScreen').then((m) => ({ default: m.AboutScreen }))
);
const ErrorScreen = lazy(() =>
  import('./screens/ErrorScreen').then((m) => ({ default: m.ErrorScreen }))
);
const ProductScreen = lazy(() =>
  import('./screens/ProductScreen').then((m) => ({ default: m.ProductScreen }))
);
const CartScreen = lazy(() =>
  import('./screens/CartScreen').then((m) => ({ default: m.CartScreen }))
);
const ProductListScreen = lazy(() =>
  import('./screens/ProductListScreen').then((m) => ({ default: m.ProductListScreen }))
);
const CheckoutScreen = lazy(() =>
  import('./screens/CheckoutScreen').then((m) => ({ default: m.CheckoutScreen }))
);

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutScreen />
                </ProtectedRoute>
              }
            />
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
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;

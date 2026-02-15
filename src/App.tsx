import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, ErrorBoundary, ProtectedRoute, Loading } from '@components';
import { HomeScreen } from '@screens';

const LoginScreen = lazy(() => import('@screens/LoginScreen'));
const RegisterScreen = lazy(() => import('@screens/RegisterScreen'));
const AboutScreen = lazy(() => import('@screens/AboutScreen'));
const ErrorScreen = lazy(() => import('@screens/ErrorScreen'));
const ProductScreen = lazy(() => import('@screens/ProductScreen'));
const CartScreen = lazy(() => import('@screens/CartScreen'));
const ProductListScreen = lazy(() => import('@screens/ProductListScreen'));
const CheckoutScreen = lazy(() => import('@screens/CheckoutScreen'));

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

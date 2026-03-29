import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import ErrorBoundary from '@components/ErrorBoundary';
import ProtectedRoute from '@components/ProtectedRoute';
import Loading from '@components/Loading';
import Footer from '@components/Footer';
import HomeScreen from '@screens/HomeScreen';
import { useAuthStore, useCartStore } from '@stores';

const LoginScreen = lazy(() => import('@screens/LoginScreen'));
const RegisterScreen = lazy(() => import('@screens/RegisterScreen'));
const AboutScreen = lazy(() => import('@screens/AboutScreen'));
const ErrorScreen = lazy(() => import('@screens/ErrorScreen'));
const ProductScreen = lazy(() => import('@screens/ProductScreen'));
const CartScreen = lazy(() => import('@screens/CartScreen'));
const ProductListScreen = lazy(() => import('@screens/ProductListScreen'));
const CheckoutScreen = lazy(() => import('@screens/CheckoutScreen'));
const OrdersScreen = lazy(() => import('@screens/OrdersScreen'));
const OrderDetailScreen = lazy(() => import('@screens/OrderDetailScreen'));
const ProfileScreen = lazy(() => import('@screens/ProfileScreen'));

function App() {
  const userInfo = useAuthStore((s) => s.userInfo);
  const fetchCart = useCartStore((s) => s.fetchCart);

  useEffect(() => {
    if (userInfo) {
      fetchCart();
    }
  }, [userInfo, fetchCart]);

  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <Sidebar />
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <main className="flex-1">
              <Routes>
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutScreen />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrdersScreen />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders/:id"
                  element={
                    <ProtectedRoute>
                      <OrderDetailScreen />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfileScreen />
                    </ProtectedRoute>
                  }
                />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/products/:id" element={<ProductScreen />} />
                <Route path="/products" element={<ProductListScreen />} />
                <Route path="/about" element={<AboutScreen />} />
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="*" element={<ErrorScreen />} />
              </Routes>
            </main>
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, ErrorBoundary, ProtectedRoute, Loading, Footer } from '@components';
import { HomeScreen } from '@screens';
import { useAuthStore, useCartStore } from '@stores';

const LoginScreen = lazy(() => import('@screens/LoginScreen'));
const RegisterScreen = lazy(() => import('@screens/RegisterScreen'));
const AboutScreen = lazy(() => import('@screens/AboutScreen'));
const ErrorScreen = lazy(() => import('@screens/ErrorScreen'));
const ProductScreen = lazy(() => import('@screens/ProductScreen'));
const CartScreen = lazy(() => import('@screens/CartScreen'));
const ProductListScreen = lazy(() => import('@screens/ProductListScreen'));
const CheckoutScreen = lazy(() => import('@screens/CheckoutScreen'));

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

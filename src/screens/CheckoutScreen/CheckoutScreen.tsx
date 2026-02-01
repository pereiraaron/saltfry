import React from 'react';
import './CheckoutScreen.css';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../stores';
import PageHero from '../../components/PageHero/PageHero';
import StripeCheckout from '../../components/StripeCheckout/StripeCheckout';

const CheckoutScreen: React.FC = () => {
  const { cartItems } = useCartStore();

  return (
    <main className="checkout-screen">
      <PageHero title="checkout" />
      <div className="page">
        {cartItems.length < 1 ? (
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </div>
    </main>
  );
};

export default CheckoutScreen;

import React from 'react';
import './CheckoutScreen.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PageHero from '../../components/PageHero/PageHero';
import StripeCheckout from '../../components/StripeCheckout/StripeCheckout';

const CheckoutScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

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

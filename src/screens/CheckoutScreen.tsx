import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@stores';
import { PageHero, StripeCheckout } from '@components';

const CheckoutScreen: React.FC = () => {
  const { cartItems } = useCartStore();

  return (
    <main className="flex items-center justify-center flex-col">
      <PageHero title="checkout" />
      <div className="page">
        {cartItems.length < 1 ? (
          <div className="text-center mt-30">
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

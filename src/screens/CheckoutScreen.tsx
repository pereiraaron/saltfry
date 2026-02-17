import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@stores';
import { PageHero, StripeCheckout } from '@components';

const CheckoutScreen: React.FC = () => {
  const { cartItems } = useCartStore();

  return (
    <main>
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
          <div className="section-center py-8">
            <StripeCheckout />
          </div>
        )}
      </div>
    </main>
  );
};

export default CheckoutScreen;

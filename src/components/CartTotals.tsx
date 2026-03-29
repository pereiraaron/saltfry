import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@utils/helpers';

interface CartTotalsProps {
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

const CartTotals: React.FC<CartTotalsProps> = ({ itemsPrice, shippingPrice, totalPrice }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-grey-10/50 border border-grey-8 rounded-xl p-6">
      <h5 className="mb-5 capitalize font-semibold">order summary</h5>
      <div className="flex justify-between mb-3 text-sm">
        <span className="text-grey-5 capitalize">subtotal</span>
        <span className="font-medium">{formatPrice(itemsPrice)}</span>
      </div>
      <div className="flex justify-between mb-3 text-sm">
        <span className="text-grey-5 capitalize">shipping</span>
        <span className="font-medium">{formatPrice(shippingPrice)}</span>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between mb-6 font-bold text-lg">
        <span className="capitalize">total</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
      <button
        type="button"
        className="btn w-full text-center font-semibold py-3"
        onClick={() => navigate('/checkout')}
      >
        proceed to checkout
      </button>
    </div>
  );
};

export default CartTotals;

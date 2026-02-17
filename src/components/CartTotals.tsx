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

  const checkoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className="border border-grey-8 rounded-lg p-5">
      <h5 className="mb-4 capitalize">order summary</h5>
      <div className="flex justify-between mb-2 text-sm">
        <span className="text-grey-5 capitalize">subtotal</span>
        <span>{formatPrice(itemsPrice)}</span>
      </div>
      <div className="flex justify-between mb-3 text-sm">
        <span className="text-grey-5 capitalize">shipping</span>
        <span>{formatPrice(shippingPrice)}</span>
      </div>
      <hr className="my-3" />
      <div className="flex justify-between mb-5 font-bold">
        <span className="capitalize">total</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
      <button
        type="button"
        className="btn w-full text-center font-bold"
        onClick={checkoutHandler}
      >
        proceed to checkout
      </button>
    </div>
  );
};

export default CartTotals;

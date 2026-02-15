import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';

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
    <section className="mt-12 flex justify-center md:justify-end">
      <div>
        <article className="border border-grey-8 rounded-default py-6 px-12">
          <h5 className="grid grid-cols-[200px_1fr]">
            subtotal :<span>&nbsp;{formatPrice(itemsPrice)}</span>
          </h5>
          <p className="grid grid-cols-[200px_1fr] capitalize">
            shipping fee :<span>&nbsp;{formatPrice(shippingPrice)}</span>
          </p>
          <hr />
          <h4 className="grid grid-cols-[200px_1fr] mt-8 text-grey-1">
            order total :<span>&nbsp;{formatPrice(totalPrice)}</span>
          </h4>
        </article>
        <button
          className="btn md:w-full md:mt-4 md:text-center md:font-bold"
          onClick={checkoutHandler}
        >
          proceed to checkout
        </button>
      </div>
    </section>
  );
};

export default CartTotals;

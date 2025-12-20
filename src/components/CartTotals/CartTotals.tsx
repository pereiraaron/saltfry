import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import './CartTotals.css';

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
    <section className="cart-totals">
      <div>
        <article>
          <h5>
            subtotal :<span>&nbsp;{formatPrice(itemsPrice)}</span>
          </h5>
          <p>
            shipping fee :<span>&nbsp;{formatPrice(shippingPrice)}</span>
          </p>
          <hr />
          <h4>
            order total :<span>&nbsp;{formatPrice(totalPrice)}</span>
          </h4>
        </article>
        <button className="btn" onClick={checkoutHandler}>
          proceed to checkout
        </button>
      </div>
    </section>
  );
};

export default CartTotals;


import React from 'react';
import './CartItem.css';
import AmountButtons from '../AmountButtons/AmountButtons';
import { FaTrash } from 'react-icons/fa';
import { formatPrice } from '../../utils/helpers';
import { removeFromCart } from '../../actions/cartActions';
import { useDispatch } from 'react-redux';

const CartItem = ({ id, image, name, color, price, amount }) => {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <div className="title">
        <img src={image} alt={name} />
        <div>
          <h5 className="name">{name}</h5>
          <p className="color">
            color :
            <span style={{ background: color }} />
          </p>
          <h5 className="price-small">{formatPrice(price)}</h5>
        </div>
      </div>
      <h5 className="price">{formatPrice(price)}</h5>
      <AmountButtons amount={amount} />
      <h5 className="subtotal">{formatPrice(price * amount)}</h5>
      <button className="remove-btn">
        <FaTrash onClick={dispatch(removeFromCart(id))} />
      </button>
    </article>
  );
};

export default CartItem;

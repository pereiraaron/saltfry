import React from 'react';
import './CartItem.css';
import AmountButtons from '../AmountButtons/AmountButtons';
import { FaTrash } from 'react-icons/fa';
import { formatPrice } from '../../utils/helpers';
import { removeFromCart } from '../../actions/cartActions';
import { useDispatch } from 'react-redux';
// Types are now global - no import needed

interface CartItemProps {
  id: string;
  image: string;
  name: string;
  color: string;
  price: number;
  amount: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, image, name, color, price, amount }) => {
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
      <AmountButtons currentqty={amount} total={99999} id={id} />
      <h5 className="subtotal">{formatPrice(price * amount)}</h5>
      <button className="remove-btn">
        <FaTrash onClick={() => dispatch(removeFromCart(id) as $TSFixMe)} />
      </button>
    </article>
  );
};

export default CartItem;


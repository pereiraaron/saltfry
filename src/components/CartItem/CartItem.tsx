import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useCartStore } from '../../stores';
import AmountButtons from '../AmountButtons/AmountButtons';
import { formatPrice } from '../../utils/helpers';

interface CartItemProps {
  id: string;
  image: string;
  name: string;
  color: string;
  price: number;
  amount: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, image, name, color, price, amount }) => {
  const { removeFromCart } = useCartStore();

  return (
    <article className="grid grid-cols-[200px_auto_auto] md:grid-cols-[1fr_1fr_1fr_1fr_auto] grid-rows-[75px] gap-x-4 gap-y-12 justify-items-center items-center mb-12">
      <div className="grid grid-cols-[75px_125px] md:grid-cols-[100px_200px] grid-rows-[75px] md:h-full items-center text-left gap-4">
        <img src={image} alt={name} className="w-full h-full block rounded-default object-cover" />
        <div>
          <h5 className="text-xs md:text-sm mb-0">{name}</h5>
          <p className="text-grey-5 text-xs tracking-widest capitalize mb-0 flex items-center justify-start">
            color :
            <span
              style={{ background: color }}
              className="inline-block w-2 h-2 ml-2 rounded-default"
            />
          </p>
          <h5 className="text-primary-5 text-xs mb-0 md:hidden">{formatPrice(price)}</h5>
        </div>
      </div>
      <h5 className="hidden md:block text-base text-primary-5 font-normal mb-0">
        {formatPrice(price)}
      </h5>
      <AmountButtons currentqty={amount} total={99999} id={id} />
      <h5 className="hidden md:block text-grey-5 font-normal text-base mb-0">
        {formatPrice(price * amount)}
      </h5>
      <button
        type="button"
        aria-label={`Remove ${name} from cart`}
        className="text-white bg-red-dark border-transparent tracking-widest w-6 h-6 flex items-center justify-center rounded-default text-xs cursor-pointer"
        onClick={() => removeFromCart(id)}
      >
        <FaTrash />
      </button>
    </article>
  );
};

export default CartItem;

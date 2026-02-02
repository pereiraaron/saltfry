import React from 'react';
import './AmountButtons.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useCartStore } from '../../stores';
import { handleDecrement, handleIncrement } from '../../utils/helpers';

interface AmountButtonsProps {
  currentqty: number;
  total: number;
  id: string;
  product?: boolean;
  setCurrentQty?: (qty: number) => void;
}

const AmountButtons: React.FC<AmountButtonsProps> = ({
  currentqty,
  total,
  id,
  product,
  setCurrentQty,
}) => {
  const { incrementQuantity, decrementQuantity } = useCartStore();

  return (
    <div className="amount-btns">
      <button
        type="button"
        className="amount-btn"
        onClick={() => {
          product
            ? setCurrentQty?.(handleDecrement(currentqty))
            : decrementQuantity(id, currentqty);
        }}
      >
        <FaMinus />
      </button>
      <h2 className="amount">{currentqty}</h2>
      <button
        type="button"
        className="amount-btn"
        onClick={() =>
          product
            ? setCurrentQty?.(handleIncrement(currentqty, total))
            : incrementQuantity(id, currentqty, total)
        }
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default AmountButtons;

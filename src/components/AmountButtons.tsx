import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useCartStore } from '@stores';
import { handleDecrement, handleIncrement } from '@utils/helpers';

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
    <div className="grid w-35 place-items-center grid-cols-3 items-center">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="bg-transparent border-transparent cursor-pointer py-4 px-0 w-8 h-4 flex items-center justify-center"
        onClick={() => {
          product
            ? setCurrentQty?.(handleDecrement(currentqty))
            : decrementQuantity(id, currentqty);
        }}
      >
        <FaMinus />
      </button>
      <h2 className="mb-0">{currentqty}</h2>
      <button
        type="button"
        aria-label="Increase quantity"
        className="bg-transparent border-transparent cursor-pointer py-4 px-0 w-8 h-4 flex items-center justify-center"
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

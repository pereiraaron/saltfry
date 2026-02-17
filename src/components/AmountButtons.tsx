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
  const { incrementQuantity, decrementQuantity, loadingItems } = useCartStore();
  const isLoading = !product && loadingItems.has(id);

  return (
    <div
      className={`grid w-24 place-items-center grid-cols-3 items-center ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className="bg-transparent border-transparent cursor-pointer py-2 px-0 w-6 h-6 flex items-center justify-center text-xs"
        disabled={isLoading}
        onClick={() => {
          product
            ? setCurrentQty?.(handleDecrement(currentqty))
            : decrementQuantity(id, currentqty);
        }}
      >
        <FaMinus />
      </button>
      <span className="text-base font-medium mb-0">{currentqty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="bg-transparent border-transparent cursor-pointer py-2 px-0 w-6 h-6 flex items-center justify-center text-xs"
        disabled={isLoading}
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

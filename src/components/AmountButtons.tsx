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
      className={`inline-flex items-center gap-1 rounded-lg border border-grey-8 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className=" border-none cursor-pointer w-10 h-10 flex items-center justify-center text-xs text-grey-5 hover:text-primary-5 transition-colors rounded-l-lg bg-grey-10"
        disabled={isLoading}
        onClick={() => {
          product
            ? setCurrentQty?.(handleDecrement(currentqty))
            : decrementQuantity(id, currentqty);
        }}
      >
        <FaMinus />
      </button>
      <span className="text-sm font-semibold w-10 text-center select-none">{currentqty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className=" border-none cursor-pointer w-10 h-10 flex items-center justify-center text-xs text-grey-5 hover:text-primary-5 transition-colors rounded-r-lg bg-grey-10"
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

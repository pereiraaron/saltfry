import React from 'react';
import './AmountButtons.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { decrementProductQuantity, incrementProductQuantity } from '../../actions/cartActions';
import { handleDecrement, handleIncrement } from '../../utils/helpers';
// Types are now global - no import needed

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
  const dispatch = useDispatch();
  return (
    <div className="amount-btns">
      <button
        type="button"
        className="amount-btn"
        onClick={() => {
          product
            ? setCurrentQty?.(handleDecrement(currentqty))
            : dispatch(decrementProductQuantity(id, currentqty) as $TSFixMe);
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
            : dispatch(incrementProductQuantity(id, currentqty, total) as $TSFixMe)
        }
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default AmountButtons;

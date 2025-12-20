import React from 'react';
import './AmountButtons.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { decrementProductQuantity, incrementProductQuantity } from '../../actions/cartActions';
import { useDispatch } from 'react-redux';
import { handleDecrement, handleIncrement } from '../../utils/helpers';

const AmountButtons = ({ currentqty, total, id, product, setCurrentQty }) => {
  const dispatch = useDispatch();
  return (
    <div className="amount-btns">
      <button
        type="button"
        className="amount-btn"
        onClick={() => {
          product
            ? setCurrentQty(handleDecrement(currentqty))
            : dispatch(decrementProductQuantity(id, currentqty));
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
            ? setCurrentQty(handleIncrement(currentqty, total))
            : dispatch(incrementProductQuantity(id, currentqty, total))
        }
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default AmountButtons;

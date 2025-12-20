import React, { useState } from 'react';
import './AddToCart.css';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AmountButtons from '../AmountButtons/AmountButtons';
// Types are now global - no import needed

interface AddToCartProps {
  product: $TSFixMe;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const navigate = useNavigate();
  console.log(product);
  const { id, stock, colors } = product;

  const [mainColor, setMainColor] = useState(colors[0]);
  const [currentqty, setCurrentQty] = useState(stock > 0 ? 1 : 0);

  const handleAddToCart = () => {
    navigate(`/cart/${id}?qty=${currentqty}`);
  };

  return (
    <section className="addtocart">
      <div className="colors">
        <span>colors :</span>
        <div>
          {colors.map((color: string, index: number) => {
            return (
              <button
                key={index}
                style={{ background: color }}
                className={`${mainColor === color ? 'color-btn active' : 'color-btn'}`}
                onClick={() => setMainColor(color)}
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          total={stock}
          id={id}
          currentqty={currentqty}
          setCurrentQty={setCurrentQty}
          product
        />
        <button
          className="btn"
          onClick={handleAddToCart}
          style={{ marginTop: '1rem', width: '140px' }}
        >
          add to cart
        </button>
      </div>
    </section>
  );
};

export default AddToCart;

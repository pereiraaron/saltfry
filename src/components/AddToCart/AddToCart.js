import React, { useState } from "react";
import "./AddToCart.css";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import AmountButtons from "../AmountButtons/AmountButtons";

const AddToCart = ({ product }) => {
  const navigate = useNavigate();
  console.log(product);
  const { id, stock, colors } = product;

  const [mainColor, setMainColor] = useState(colors[0]);
  const [currentqty, setCurrentQty] = useState(stock > 0 && 1);

  const handleAddToCart = () => {
    navigate(`/cart/${id}?qty=${currentqty}`);
  };

  return (
    <section className="addtocart">
      <div className="colors">
        <span>colors :</span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                style={{ background: color }}
                className={`${mainColor === color ? "color-btn active" : "color-btn"
                  }`}
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
          product={true}
        />
        <button
          className="btn"
          onClick={handleAddToCart}
          style={{ marginTop: "1rem", width: "140px" }}
        >
          add to cart
        </button>
      </div>
    </section>
  );
};

export default AddToCart;

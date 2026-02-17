import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Product } from '@types';
import { useCartStore } from '@stores';
import AmountButtons from './AmountButtons';

interface AddToCartProps {
  product: Product;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const { id, stock = 0, colors } = product;
  const addToCart = useCartStore((s) => s.addToCart);

  const [mainColor, setMainColor] = useState(colors[0]);
  const [currentqty, setCurrentQty] = useState(stock > 0 ? 1 : 0);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    await addToCart(id, currentqty, mainColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="mt-8">
      <div className="grid grid-cols-[125px_1fr] items-center mb-4">
        <span className="capitalize font-bold">colors :</span>
        <div className="flex">
          {colors.map((color: string, index: number) => {
            return (
              <button
                key={index}
                style={{ background: color }}
                className={`w-6 h-6 rounded-full mr-2 border-none cursor-pointer flex items-center justify-center ${
                  mainColor === color ? 'opacity-100' : 'opacity-50'
                }`}
                onClick={() => setMainColor(color)}
              >
                {mainColor === color ? <FaCheck className="text-xs text-white" /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-8">
        <AmountButtons
          total={stock}
          id={id}
          currentqty={currentqty}
          setCurrentQty={setCurrentQty}
          product
        />
        <button type="button" className="btn mt-4 w-35" onClick={handleAddToCart}>
          {added ? 'added!' : 'add to cart'}
        </button>
      </div>
    </section>
  );
};

export default AddToCart;

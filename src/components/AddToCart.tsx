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
      <div className="flex items-center gap-4 mb-5">
        <span className="capitalize font-semibold text-sm">colors :</span>
        <div className="flex gap-2">
          {colors.map((color: string, index: number) => {
            return (
              <button
                key={index}
                style={{ background: color }}
                className={`w-7 h-7 rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-200 ${
                  mainColor === color
                    ? 'ring-2 ring-offset-2 ring-primary-5 scale-110'
                    : 'opacity-60 hover:opacity-90'
                }`}
                onClick={() => setMainColor(color)}
              >
                {mainColor === color ? <FaCheck className="text-xs text-white" /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <AmountButtons
          total={stock}
          id={id}
          currentqty={currentqty}
          setCurrentQty={setCurrentQty}
          product
        />
        <button
          type="button"
          className={`btn w-full sm:w-40 py-2.5 text-center font-semibold transition-all duration-200 ${
            added ? 'bg-green-dark! text-white!' : ''
          }`}
          onClick={handleAddToCart}
        >
          {added ? 'added!' : 'add to cart'}
        </button>
      </div>
    </section>
  );
};

export default AddToCart;

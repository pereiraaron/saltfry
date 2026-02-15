import React from 'react';

const CartColumns: React.FC = () => {
  return (
    <div className="hidden md:block">
      <div className="grid grid-cols-[316px_1fr_1fr_1fr_auto] justify-items-center gap-x-4">
        <h5 className="text-grey-5 font-normal">item</h5>
        <h5 className="text-grey-5 font-normal">price</h5>
        <h5 className="text-grey-5 font-normal">quantity</h5>
        <h5 className="text-grey-5 font-normal">subtotal</h5>
        <span className="w-8 h-8" />
      </div>
      <hr className="mt-4 mb-12" />
    </div>
  );
};

export default CartColumns;

import React from 'react';
import { FaRegFrown } from 'react-icons/fa';

const StripeCheckout: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <FaRegFrown className="my-8 mx-auto text-6xl" />
      <h1 className="text-center">Currently Unavailable...</h1>
    </div>
  );
};

export default StripeCheckout;

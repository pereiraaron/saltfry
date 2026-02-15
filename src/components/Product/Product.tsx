import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';

interface ProductProps {
  image: string;
  name: string;
  price: number;
  id: string;
}

const Product: React.FC<ProductProps> = ({ image, name, price, id }) => {
  return (
    <article>
      <div className="relative bg-black rounded group">
        <img
          src={image}
          alt={name}
          className="w-full block object-cover rounded transition-all duration-300 group-hover:opacity-50"
        />
        <Link
          to={`/products/${id}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-5 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 opacity-0 cursor-pointer group-hover:opacity-100"
        >
          <FaSearch className="text-xl text-white" />
        </Link>
      </div>
      <footer className="mt-4 flex justify-between items-center">
        <h5 className="mb-0 font-normal">{name}</h5>
        <p className="text-primary-5 tracking-widest mb-0">{formatPrice(price)}</p>
      </footer>
    </article>
  );
};

export default Product;

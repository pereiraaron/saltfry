import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatPrice } from '@utils/helpers';

interface ProductProps {
  image: string;
  name: string;
  price: number;
  id: string;
}

const Product: React.FC<ProductProps> = ({ image, name, price, id }) => {
  return (
    <article className="group rounded-lg overflow-hidden bg-white shadow-[0_1px_3px_hsl(22,31%,52%,0.1)] hover:shadow-[0_12px_32px_-8px_hsl(22,31%,52%,0.2)] transition-all duration-300 hover:-translate-y-1">
      <div className="relative bg-grey-10 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full block object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Link
          to={`/products/${id}`}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all duration-300"
        >
          <span className="bg-white flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 shadow-lg">
            <FaSearch className="text-sm text-primary-5" />
          </span>
        </Link>
      </div>
      <footer className="px-4 py-4 flex justify-between items-center">
        <h5 className="mb-0 font-medium text-grey-1">{name}</h5>
        <p className="text-primary-5 font-semibold tracking-wide mb-0">{formatPrice(price)}</p>
      </footer>
    </article>
  );
};

export default Product;

import React from 'react';
import './Product.css';
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
    <article className="product-container">
      <div className="container">
        <img src={image} alt={name} />
        <Link to={`/products/${id}`} className="link">
          <FaSearch />
        </Link>
      </div>
      <footer>
        <h5>{name}</h5>
        <p>{formatPrice(price)}</p>
      </footer>
    </article>
  );
};

export default Product;

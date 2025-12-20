import React from 'react';
import './ListView.css';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
// Types are now global - no import needed

interface ListViewProps {
  products: $TSFixMe[];
}

const ListView: React.FC<ListViewProps> = ({ products }) => {
  return (
    <section className="list-view">
      {products.map((product) => {
        const { id, image, name, price, description } = product;
        return (
          <article key={id}>
            <img src={image} alt={name} />
            <div>
              <h4>{name}</h4>
              <h5 className="price">{formatPrice(price)}</h5>
              <p>{description.substring(0, 150)}...</p>
              <Link to={`/products/${id}`} className="btn">
                Details
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default ListView;

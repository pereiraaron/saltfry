import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@utils/helpers';
import { Product } from '@types';

interface ListViewProps {
  products: Product[];
}

const ListView: React.FC<ListViewProps> = ({ products }) => {
  return (
    <section className="grid gap-y-12">
      {products.map((product) => {
        const { id, image, name, price, description } = product;
        return (
          <article key={id} className="lg:grid lg:grid-cols-[auto_1fr] lg:gap-x-8 lg:items-center">
            <img
              src={image}
              alt={name}
              className="block w-75 h-50 object-cover rounded-default mb-4"
            />
            <div>
              <h4 className="mb-2">{name}</h4>
              <h5 className="text-primary-6 mb-3">{formatPrice(price)}</h5>
              <p className="max-w-[45em] mb-4">{description.substring(0, 150)}...</p>
              <Link to={`/products/${id}`} className="btn text-[0.5rem] py-1 px-2">
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

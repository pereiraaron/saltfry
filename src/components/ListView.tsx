import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@utils/helpers';
import { Product } from '@types';

interface ListViewProps {
  products: Product[];
}

const ListView: React.FC<ListViewProps> = ({ products }) => {
  return (
    <section className="grid gap-6">
      {products.map((product) => {
        const { id, image, name, price, description } = product;
        return (
          <article
            key={id}
            className="bg-white rounded-lg overflow-hidden shadow-[0_1px_3px_hsl(22,31%,52%,0.1)] hover:shadow-[0_8px_24px_-6px_hsl(22,31%,52%,0.2)] transition-all duration-300 lg:grid lg:grid-cols-[280px_1fr] lg:items-center"
          >
            <img
              src={image}
              alt={name}
              loading="lazy"
              decoding="async"
              className="block w-full h-52 lg:h-full object-cover"
            />
            <div className="p-5 lg:p-6">
              <h4 className="mb-2">{name}</h4>
              <h5 className="text-primary-5 mb-3 font-semibold">{formatPrice(price)}</h5>
              <p className="max-w-[45em] mb-5 text-grey-5 leading-relaxed">
                {description.substring(0, 150)}...
              </p>
              <Link to={`/products/${id}`} className="btn text-xs py-1.5 px-4">
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

import React from 'react';
import { Product as ProductType } from '@types';
import Product from './Product';

interface GridViewProps {
  products: ProductType[];
}

const GridView: React.FC<GridViewProps> = ({ products }) => {
  return (
    <section className="[&_img]:h-43.75">
      <div className="grid gap-y-8 gap-x-6 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </section>
  );
};

export default GridView;

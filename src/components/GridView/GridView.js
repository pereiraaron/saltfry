import React from 'react';
import Product from '../Product/Product';
import './GridView.css';

const GridView = ({ products }) => {
  return (
    <section className="grid-view">
      <div className="products-container">
        {products.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </section>
  );
};

export default GridView;

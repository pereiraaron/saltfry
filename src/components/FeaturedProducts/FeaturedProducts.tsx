import React, { useEffect } from 'react';
import './FeaturedProducts.css';
import { Link } from 'react-router-dom';
import { useProductStore } from '../../stores';
import Loading from '../Loading/Loading';
import Product from '../Product/Product';

const FeaturedProducts: React.FC = () => {
  const {
    products,
    productsLoading: loading,
    productsError: error,
    fetchProducts,
  } = useProductStore();

  useEffect(() => {
    fetchProducts({ featured: true });
  }, [fetchProducts]);

  return loading ? (
    <Loading />
  ) : error ? (
    'Error'
  ) : (
    <section className="featured-products">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline" />
      </div>
      <div className="section-center featured">
        {products.slice(0, 3).map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
      <Link to="/products" className="btn">
        all products
      </Link>
    </section>
  );
};

export default FeaturedProducts;

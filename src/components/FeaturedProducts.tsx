import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '@stores';
import Loading from './Loading';
import Product from './Product';

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
    <section className="py-20 bg-grey-10">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline" />
      </div>
      <div className="section-center my-16 grid gap-10 sm:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] [&_img]:h-56.25">
        {products.slice(0, 3).map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
      <Link to="/products" className="btn block w-37 mx-auto text-center">
        all products
      </Link>
    </section>
  );
};

export default FeaturedProducts;

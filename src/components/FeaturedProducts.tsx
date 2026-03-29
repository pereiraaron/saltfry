import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '@stores';
import Product from './Product';

const ProductSkeleton: React.FC = () => (
  <article className="animate-pulse rounded-lg overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
    <div className="h-52 bg-grey-9" />
    <div className="px-4 py-4 flex justify-between items-center">
      <div className="h-4 w-28 rounded-full bg-grey-9" />
      <div className="h-4 w-16 rounded-full bg-grey-9" />
    </div>
  </article>
);

const FeaturedProducts: React.FC = () => {
  const products = useProductStore((s) => s.products);
  const loading = useProductStore((s) => s.productsLoading);
  const error = useProductStore((s) => s.productsError);
  const fetchProducts = useProductStore((s) => s.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-16 bg-grey-10/50">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline" />
      </div>
      {loading ? (
        <div className="section-center my-10 grid gap-6 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] lg:grid-cols-3">
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
      ) : error ? (
        <p className="text-center text-red-dark mt-8">{error}</p>
      ) : (
        <div className="section-center my-10 grid gap-6 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] lg:grid-cols-3 [&_img]:h-52">
          {featured.map((product) => {
            return <Product key={product.id} {...product} />;
          })}
        </div>
      )}
      <Link to="/products" className="btn block w-fit mx-auto text-center whitespace-nowrap">
        all products
      </Link>
    </section>
  );
};

export default FeaturedProducts;

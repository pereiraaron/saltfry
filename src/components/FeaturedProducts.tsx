import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, ApiResponse, normalizeApiProduct } from '@utils/api';
import { Product as ProductType } from '@types';
import Product from './Product';

const ProductSkeleton: React.FC = () => (
  <article className="animate-pulse">
    <div className="h-56.25 rounded bg-grey-8" />
    <footer className="mt-4 flex justify-between items-center">
      <div className="h-4 w-28 rounded bg-grey-8" />
      <div className="h-4 w-16 rounded bg-grey-8" />
    </footer>
  </article>
);

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(`${API_URL}products?featured=true`);
        if (!response.ok) {
          throw new Error(`Failed to fetch featured products: ${response.statusText}`);
        }
        const data = await response.json();
        const featured: ProductType[] = Array.isArray(data)
          ? data
          : (data as ApiResponse).data.map(normalizeApiProduct);
        setProducts(featured);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured products');
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-12 bg-grey-10">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline" />
      </div>
      {loading ? (
        <div className="section-center my-8 grid gap-10 sm:grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
      ) : error ? (
        <p className="text-center text-red-dark">{error}</p>
      ) : (
        <div className="section-center my-8 grid gap-10 sm:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] [&_img]:h-56.25">
          {products.slice(0, 3).map((product) => {
            return <Product key={product.id} {...product} />;
          })}
        </div>
      )}
      <Link to="/products" className="btn block w-37 mx-auto text-center">
        all products
      </Link>
    </section>
  );
};

export default FeaturedProducts;

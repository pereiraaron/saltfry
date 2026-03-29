import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProductStore } from '@stores';
import { formatPrice } from '@utils/helpers';
import { PageHero, ProductImages, Rating, AddToCart } from '@components';

const ProductScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    product,
    productLoading: loading,
    productError: error,
    fetchProductDetails,
  } = useProductStore();

  const {
    name = '',
    price = 0,
    description = '',
    stock = 0,
    id: productId = '',
    company = '',
    images = [],
    stars = 0,
    reviews = 0,
  } = product || {};

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id, fetchProductDetails]);

  return loading ? (
    <main>
      <div className="section section-center page animate-pulse">
        <div className="h-8 w-36 rounded-full bg-grey-9 mb-8" />
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <div className="h-72 sm:h-96 lg:h-150 w-full rounded-xl bg-grey-9" />
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-25 rounded-lg bg-grey-9" />
              ))}
            </div>
          </div>
          <div>
            <div className="h-10 w-3/4 rounded-full bg-grey-9 mb-4" />
            <div className="h-4 w-32 rounded-full bg-grey-9 mb-4" />
            <div className="h-6 w-24 rounded-full bg-grey-9 mb-6" />
            <div className="space-y-3 mb-6">
              <div className="h-4 w-full rounded-full bg-grey-9" />
              <div className="h-4 w-full rounded-full bg-grey-9" />
              <div className="h-4 w-2/3 rounded-full bg-grey-9" />
            </div>
            <div className="space-y-2 mb-6">
              <div className="h-4 w-48 rounded-full bg-grey-9" />
              <div className="h-4 w-48 rounded-full bg-grey-9" />
              <div className="h-4 w-48 rounded-full bg-grey-9" />
            </div>
          </div>
        </div>
      </div>
    </main>
  ) : error ? (
    <main className="page-100">
      <div className="section-center text-center">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <Link to="/products" className="btn">
          back to products
        </Link>
      </div>
    </main>
  ) : (
    <main>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn mb-8 inline-block">
          back to products
        </Link>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <ProductImages images={images} name={name} />
          <section className="lg:sticky lg:top-28">
            <h2 className="mb-3">{name}</h2>
            <Rating stars={stars} reviews={reviews} />
            <h5 className="text-primary-5 text-xl! font-bold mb-4">{formatPrice(price)}</h5>
            <p className="leading-8 max-w-[45em] text-grey-5">{description}</p>
            <div className="grid gap-2 mb-4">
              <p className="capitalize text-sm grid grid-cols-[100px_1fr] mb-0">
                <span className="font-semibold">Available</span>
                <span className={stock > 0 ? 'text-green-dark' : 'text-red-dark'}>
                  {stock > 0 ? 'In stock' : 'Out of stock'}
                </span>
              </p>
              <p className="capitalize text-sm grid grid-cols-[100px_1fr] mb-0">
                <span className="font-semibold">SKU</span>
                <span className="text-grey-5 font-mono text-xs">{productId}</span>
              </p>
              <p className="capitalize text-sm grid grid-cols-[100px_1fr] mb-0">
                <span className="font-semibold">Brand</span>
                <span>{company}</span>
              </p>
            </div>
            <hr className="my-5" />
            {stock > 0 && product && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductScreen;

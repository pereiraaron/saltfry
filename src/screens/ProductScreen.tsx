import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProductStore } from '@stores';
import { formatPrice } from '@utils/helpers';
import { PageHero, ProductImages, Loading, Rating, AddToCart } from '@components';

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
    <Loading />
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
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div
          className="grid gap-16 mt-8
            lg:grid-cols-2 lg:items-center"
        >
          <ProductImages images={images} name={name} />
          <section>
            <h2>{name}</h2>
            <Rating stars={stars} reviews={reviews} />
            <h5
              className="text-primary-5
                lg:text-[1.25rem]"
            >
              {formatPrice(price)}
            </h5>
            <p className="leading-8 max-w-[45em]">{description}</p>
            <p
              className="capitalize w-75 grid
                grid-cols-[125px_1fr]"
            >
              <span className="font-bold">Available : </span>
              {stock > 0 ? 'In stock' : 'out of stock'}
            </p>
            <p
              className="capitalize w-75 grid
                grid-cols-[125px_1fr]"
            >
              <span className="font-bold">SKU :</span>
              {productId}
            </p>
            <p
              className="capitalize w-75 grid
                grid-cols-[125px_1fr]"
            >
              <span className="font-bold">Brand :</span>
              {company}
            </p>
            <hr />
            {stock > 0 && product && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductScreen;

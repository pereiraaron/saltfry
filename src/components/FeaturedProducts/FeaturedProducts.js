import React, { useEffect } from 'react';
import './FeaturedProducts.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../../actions/productActions';
import Product from '../Product/Product';
import Loading from '../Loading/Loading';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // const featured_products = products.filter((product) => {
  //   return product.featured;
  // });

  // useEffect(() => {
  // dispatch(listProducts());
  // }, [dispatch]);

  return loading ? (
    <Loading />
  ) : error ? (
    'Error'
  ) : (
    <section className="featured-products">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {/* {featured_products.slice(0, 3).map((product) => {
          return <Product key={product.id} {...product} />;
        })} */}
      </div>
      <Link to="/products" className="btn">
        all products
      </Link>
    </section>
  );
};

export default FeaturedProducts;

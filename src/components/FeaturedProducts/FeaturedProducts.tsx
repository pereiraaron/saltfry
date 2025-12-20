import React from 'react';
import './FeaturedProducts.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { RootState } from '../../types';

const FeaturedProducts: React.FC = () => {
  const productList = useSelector((state: RootState) => state.productList);
  const { loading, error } = productList;

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
        <div className="underline" />
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

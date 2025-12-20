import React, { useEffect } from 'react';
import './ProductListScreen.css';
import PageHero from '../../components/PageHero/PageHero';
import Filters from '../../components/Filters/Filters';
import Sort from '../../components/Sort/Sort';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import ProductList from '../../components/ProductList/ProductList';
import Footer from '../../components/Footer.js/Footer';

const ProductListScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <main className="product-lists">
        <PageHero title="products" />
        <div className="page">
          <div className="section-center products">
            <Filters products={products} />
            <div>
              <Sort products={products} />
              <ProductList products={products} loading={loading} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductListScreen;

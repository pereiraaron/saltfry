import React, { useEffect } from 'react';
import './ProductListScreen.css';
import { useProductStore } from '../../stores';
import PageHero from '../../components/PageHero/PageHero';
import Filters from '../../components/Filters/Filters';
import Sort from '../../components/Sort/Sort';
import ProductList from '../../components/ProductList/ProductList';
import Footer from '../../components/Footer.js/Footer';

const ProductListScreen: React.FC = () => {
  const { products, productsLoading: loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

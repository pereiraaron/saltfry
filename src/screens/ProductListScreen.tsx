import React, { useEffect } from 'react';
import { useProductStore } from '../stores';
import PageHero from '../components/PageHero/PageHero';
import Filters from '../components/Filters/Filters';
import Sort from '../components/Sort/Sort';
import ProductList from '../components/ProductList/ProductList';
import Footer from '../components/Footer.js/Footer';

export const ProductListScreen: React.FC = () => {
  const { products, productsLoading: loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <main>
        <PageHero title="products" />
        <div className="page">
          <div
            className="section-center grid gap-y-12
              gap-x-6 my-16 mx-auto
              md:grid-cols-[200px_1fr]"
          >
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

import React, { useEffect } from 'react';
import { useProductStore } from '@stores';
import { PageHero, Filters, Sort, ProductList, Message } from '@components';

const ProductListScreen: React.FC = () => {
  const {
    products,
    productsLoading: loading,
    productsError: error,
    fetchProducts,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main>
      <PageHero title="products" />
      <div className="page">
        {error && products.length === 0 ? (
          <div className="section-center py-16 text-center">
            <Message type="error">{error}</Message>
            <button type="button" className="btn mt-4" onClick={fetchProducts}>
              try again
            </button>
          </div>
        ) : (
          <div
            className="section-center grid gap-y-4
              gap-x-6 my-8 mx-auto
              md:my-16 md:gap-y-12 md:grid-cols-[200px_1fr]"
          >
            <Filters products={products} />
            <div>
              <Sort products={products} />
              <ProductList products={products} loading={loading} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductListScreen;

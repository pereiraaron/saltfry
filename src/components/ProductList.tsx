import React, { useEffect } from 'react';
import { useUIStore } from '@stores';
import { Product } from '@types';
import GridView from './GridView';
import ListView from './ListView';

const ProductCardSkeleton: React.FC = () => (
  <div className="animate-pulse rounded-lg overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
    <div className="h-52 bg-grey-9" />
    <div className="px-4 py-4 flex justify-between items-center">
      <div className="h-4 w-28 rounded-full bg-grey-9" />
      <div className="h-4 w-16 rounded-full bg-grey-9" />
    </div>
  </div>
);

interface ProductListProps {
  products: Product[];
  loading?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  const { filteredProducts, gridView, filters, applyFilters } = useUIStore();

  useEffect(() => {
    if (filteredProducts) {
      applyFilters(products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, applyFilters]);

  if (loading) {
    return (
      <section>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (filteredProducts.length < 1) {
    return <h5 style={{ textTransform: 'none' }}>Sorry, no products matched your search.</h5>;
  }

  if (gridView === true) {
    return <GridView products={filteredProducts} />;
  }

  return <ListView products={filteredProducts} />;
};

export default ProductList;

import React, { useEffect } from 'react';
import { useUIStore } from '@stores';
import { Product } from '@types';
import GridView from './GridView';
import ListView from './ListView';
import Loading from './Loading';

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
    return <Loading />;
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

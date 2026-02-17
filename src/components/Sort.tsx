import React, { useEffect } from 'react';
import { useUIStore } from '@stores';
import { Product } from '@types';

const SORT_LOWEST_PRICE = 'SORT_LOWEST_PRICE';
const SORT_HIGHEST_PRICE = 'SORT_HIGHEST_PRICE';
const SORT_NAME_A_Z = 'SORT_NAME_A_Z';
const SORT_NAME_Z_A = 'SORT_NAME_Z_A';

interface SortProps {
  products: Product[];
}

const Sort: React.FC<SortProps> = ({ products: unsortedProducts }) => {
  const { filteredProducts, sortType, sortProducts } = useUIStore();

  useEffect(() => {
    sortProducts(SORT_LOWEST_PRICE, unsortedProducts);
  }, [unsortedProducts, sortProducts]);

  return (
    <section className="flex items-center justify-between mb-6 sm:mb-8">
      <p className="capitalize mb-0 text-sm text-grey-5">{filteredProducts.length} products found</p>
      <form className="shrink-0">
        <label htmlFor="sort" className="text-sm capitalize mr-1.5 hidden sm:inline">
          sort by
        </label>
        <select
          name="sort"
          id="sort"
          value={sortType}
          className="border-transparent text-sm capitalize py-1 px-1.5 bg-grey-10 rounded"
          onChange={(e) => {
            sortProducts(e.target.value, filteredProducts);
          }}
        >
          <option value={SORT_LOWEST_PRICE}>price (lowest)</option>
          <option value={SORT_HIGHEST_PRICE}>price (highest)</option>
          <option value={SORT_NAME_A_Z}>name (a - z)</option>
          <option value={SORT_NAME_Z_A}>name (z - a)</option>
        </select>
      </form>
    </section>
  );
};

export default Sort;

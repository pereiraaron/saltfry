import React, { useEffect } from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';
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
  const { filteredProducts, sortType, gridView, setGridView, setListView, sortProducts } =
    useUIStore();

  useEffect(() => {
    sortProducts(SORT_LOWEST_PRICE, unsortedProducts);
  }, [unsortedProducts, sortProducts]);

  return (
    <section className="grid grid-cols-1 gap-y-3 sm:grid-cols-[auto_auto_1fr_auto] sm:items-center sm:gap-x-8 mb-8">
      <div className="grid grid-cols-2 gap-x-2 w-12.5 sm:w-auto">
        <button
          onClick={() => setGridView()}
          className={`border border-black w-6 h-6 rounded flex items-center justify-center cursor-pointer ${gridView ? 'bg-black text-white' : 'bg-transparent text-black'}`}
        >
          <BsFillGridFill className="text-base" />
        </button>
        <button
          onClick={() => setListView()}
          className={`border border-black w-6 h-6 rounded flex items-center justify-center cursor-pointer ${!gridView ? 'bg-black text-white' : 'bg-transparent text-black'}`}
        >
          <BsList className="text-base" />
        </button>
      </div>
      <p className="capitalize mb-0!">{filteredProducts.length} products found</p>
      <hr />
      <form>
        <label htmlFor="sort" className="text-base capitalize sm:mr-0 mr-2 inline-block sm:inline">
          sort by
        </label>
        <select
          name="sort"
          id="sort"
          value={sortType}
          className="border-transparent text-base capitalize py-1 px-2"
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

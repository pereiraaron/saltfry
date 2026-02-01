import React, { useEffect } from 'react';
import './Sort.css';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import { useUIStore } from '../../stores';
import { Product } from '../../types';

const SORT_LOWEST_PRICE = 'SORT_LOWEST_PRICE';
const SORT_HIGHEST_PRICE = 'SORT_HIGHEST_PRICE';
const SORT_NAME_A_Z = 'SORT_NAME_A_Z';
const SORT_NAME_Z_A = 'SORT_NAME_Z_A';

interface SortProps {
  products: Product[];
}

const Sort: React.FC<SortProps> = ({ products: unsortedProducts }) => {
  const { filteredProducts, sortType, gridView, setGridView, setListView, sortProducts } = useUIStore();

  useEffect(() => {
    sortProducts(SORT_LOWEST_PRICE, unsortedProducts);
  }, [unsortedProducts, sortProducts]);

  return (
    <section className="sort">
      <div className="btn-container">
        <button
          onClick={() => setGridView()}
          className={`${gridView ? 'active' : ''}`}
        >
          <BsFillGridFill />
        </button>
        <button
          onClick={() => setListView()}
          className={`${!gridView ? 'active' : ''}`}
        >
          <BsList />
        </button>
      </div>
      <p>{filteredProducts.length} products found</p>
      <hr />
      <form>
        <label htmlFor="sort">sort by</label>
        <select
          name="sort"
          id="sort"
          value={sortType}
          className="sort-input"
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

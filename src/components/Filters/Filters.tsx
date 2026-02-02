import React from 'react';
import './Filters.css';
import { FaCheck } from 'react-icons/fa';
import { useUIStore } from '../../stores';
import { formatPrice, getUniqueValues } from '../../utils/helpers';
import { Product } from '../../types';

interface FiltersProps {
  products: Product[];
}

const Filters: React.FC<FiltersProps> = ({ products }) => {
  const { filters, updateFilter, clearFilters } = useUIStore();
  const { filterkeyword, category, company, color, price, min_price, max_price, shipping } =
    filters;

  const categories = getUniqueValues(products, 'category');
  const companies = getUniqueValues(products, 'company');
  const colors = getUniqueValues(products, 'colors');

  return (
    <section className="filters">
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="filterkeyword"
              value={filterkeyword}
              placeholder="search"
              onChange={(e) => {
                updateFilter(e.target.name, e.target.value);
              }}
              className="search-input"
            />
          </div>
          {/* end of search input */}
          {/* category */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((categoryname: $TSFixMe, index: number) => {
                return (
                  <button
                    key={index}
                    onClick={(e) => {
                      updateFilter(e.currentTarget.name, e.currentTarget.textContent || '');
                    }}
                    type="button"
                    name="category"
                    className={`${category === categoryname.toLowerCase() ? 'active' : ''}`}
                  >
                    {categoryname}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of category */}
          {/* company */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              value={company}
              onChange={(e) => {
                updateFilter(e.target.name, e.target.value);
              }}
              className="company"
            >
              {companies.map((companyname: $TSFixMe, index: number) => {
                return (
                  <option key={index} value={companyname}>
                    {companyname}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of company */}
          {/* colors */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((c: $TSFixMe, index: number) => {
                if (c === 'all') {
                  return (
                    <button
                      key={index}
                      name="color"
                      onClick={(e) => {
                        updateFilter(e.currentTarget.name, e.currentTarget.dataset.color || '');
                      }}
                      data-color="all"
                      className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="color"
                    style={{ background: c }}
                    className={`${color === c ? 'color-btn active' : 'color-btn'}`}
                    data-color={c}
                    onClick={(e) =>
                      updateFilter(e.currentTarget.name, e.currentTarget.dataset.color || '')
                    }
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}
          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              min={min_price}
              max={max_price}
              value={price}
              onChange={(e) => {
                updateFilter(e.target.name, Number(e.target.value));
              }}
            />
          </div>
          {/* end of price */}
          {/* shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={(e) => updateFilter(e.target.name, e.target.checked)}
            />
          </div>
          {/* end of  shipping */}
        </form>
        <button
          type="button"
          className="clear-btn"
          onClick={() => {
            clearFilters(products);
          }}
        >
          clear filters
        </button>
      </div>
    </section>
  );
};

export default Filters;

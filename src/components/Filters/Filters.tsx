import React from 'react';
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
    <section>
      <div className="md:sticky md:top-4">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="mb-5">
            <input
              type="text"
              name="filterkeyword"
              value={filterkeyword}
              placeholder="search"
              onChange={(e) => {
                updateFilter(e.target.name, e.target.value);
              }}
              className="p-2 bg-grey-10 rounded border-transparent tracking-widest placeholder:capitalize"
            />
          </div>
          {/* end of search input */}
          {/* category */}
          <div className="mb-5">
            <h5 className="mb-2">category</h5>
            <div>
              {categories.map((categoryname: string, index: number) => {
                return (
                  <button
                    key={index}
                    onClick={(e) => {
                      updateFilter(e.currentTarget.name, e.currentTarget.textContent || '');
                    }}
                    type="button"
                    name="category"
                    className={`block my-1 py-1 capitalize bg-transparent border-none border-b border-b-transparent tracking-widest text-grey-5 cursor-pointer ${category === categoryname.toLowerCase() ? 'border-b-grey-5' : ''}`}
                  >
                    {categoryname}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of category */}
          {/* company */}
          <div className="mb-5">
            <h5 className="mb-2">company</h5>
            <select
              name="company"
              value={company}
              onChange={(e) => {
                updateFilter(e.target.name, e.target.value);
              }}
              className="bg-grey-10 rounded border-transparent p-1"
            >
              {companies.map((companyname: string, index: number) => {
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
          <div className="mb-5">
            <h5 className="mb-2">colors</h5>
            <div className="flex items-center">
              {colors.map((c: string, index: number) => {
                if (c === 'all') {
                  return (
                    <button
                      key={index}
                      name="color"
                      onClick={(e) => {
                        updateFilter(e.currentTarget.name, e.currentTarget.dataset.color || '');
                      }}
                      data-color="all"
                      className={`flex items-center justify-center mr-2 bg-transparent border-none border-b border-b-transparent tracking-widest text-grey-5 cursor-pointer capitalize ${color === 'all' ? 'opacity-100' : 'opacity-50'}`}
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
                    className={`inline-flex w-4 h-4 rounded-full mr-2 border-none cursor-pointer items-center justify-center ${color === c ? 'opacity-100' : 'opacity-50'}`}
                    data-color={c}
                    onClick={(e) =>
                      updateFilter(e.currentTarget.name, e.currentTarget.dataset.color || '')
                    }
                  >
                    {color === c ? <FaCheck className="text-[0.5rem] text-white" /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}
          {/* price */}
          <div className="mb-5">
            <h5 className="mb-2">price</h5>
            <p className="mb-1">{formatPrice(price)}</p>
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
          <div className="mb-5 flex items-center gap-x-2 text-base">
            <label htmlFor="shipping" className="capitalize select-none cursor-pointer">
              free shipping
            </label>
            <button
              type="button"
              id="shipping"
              role="switch"
              aria-checked={shipping}
              aria-label="Free shipping"
              onClick={() => updateFilter('shipping', !shipping)}
              className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                shipping ? 'bg-primary-5' : 'bg-grey-6'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  shipping ? 'translate-x-3' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          {/* end of  shipping */}
        </form>
        <button
          type="button"
          className="bg-red-dark text-white py-1 px-2 rounded cursor-pointer"
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

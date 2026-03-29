import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useUIStore } from '@stores';
import { formatPrice, getUniqueValues } from '@utils/helpers';
import { Product } from '@types';

const PriceSlider: React.FC<{
  price: number;
  min_price: number;
  max_price: number;
  onCommit: (val: number) => void;
}> = ({ price, min_price, max_price, onCommit }) => {
  const [localPrice, setLocalPrice] = useState(price);

  useEffect(() => {
    setLocalPrice(price);
  }, [price]);

  return (
    <div className="mb-5">
      <h5 className="mb-2.5 font-semibold text-sm">price</h5>
      <p className="mb-1.5 text-sm font-medium text-primary-5">{formatPrice(localPrice)}</p>
      <input
        type="range"
        name="price"
        min={min_price}
        max={max_price}
        value={localPrice}
        onChange={(e) => setLocalPrice(Number(e.target.value))}
        onMouseUp={() => onCommit(localPrice)}
        onTouchEnd={() => onCommit(localPrice)}
        className="w-full accent-primary-5 cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};

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
  const [open, setOpen] = useState(false);

  return (
    <section>
      <div className="md:sticky md:top-28">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-5 flex gap-2">
            <input
              type="text"
              name="filterkeyword"
              value={filterkeyword}
              placeholder="Search products..."
              onChange={(e) => {
                updateFilter(e.target.name, e.target.value);
              }}
              className="w-full py-2.5 px-3 bg-white rounded-lg border border-grey-8 tracking-wide placeholder:capitalize placeholder:text-grey-6 focus:border-primary-5 focus:outline-none transition-colors text-sm"
            />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border border-grey-8 bg-white text-grey-5 hover:text-primary-5 hover:border-primary-5 transition-colors cursor-pointer"
              aria-label={open ? 'Hide filters' : 'Show filters'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="8" y1="12" x2="20" y2="12" />
                <line x1="12" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>

          <div
            className={`${open ? 'grid' : 'hidden'} md:grid grid-cols-2 gap-x-6 md:grid-cols-1 md:gap-x-0`}
          >
            <div className="mb-5">
              <h5 className="mb-2.5 font-semibold text-sm">category</h5>
              <div className="grid gap-0.5">
                {categories.map((categoryname: string, index: number) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      updateFilter(e.currentTarget.name, e.currentTarget.textContent || '');
                    }}
                    type="button"
                    name="category"
                    className={`text-left py-1 px-1 capitalize bg-transparent border-none tracking-wide text-sm cursor-pointer rounded transition-colors ${
                      category === categoryname.toLowerCase()
                        ? 'text-primary-5 font-medium'
                        : 'text-grey-5 hover:text-grey-2'
                    }`}
                  >
                    {categoryname}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-5">
                <h5 className="mb-2.5 font-semibold text-sm">company</h5>
                <select
                  name="company"
                  value={company}
                  onChange={(e) => {
                    updateFilter(e.target.name, e.target.value);
                  }}
                  className="bg-white rounded-lg border border-grey-8 py-1.5 px-2 capitalize text-sm focus:border-primary-5 focus:outline-none transition-colors cursor-pointer"
                >
                  {companies.map((companyname: string, index: number) => (
                    <option key={index} value={companyname}>
                      {companyname}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <h5 className="mb-2.5 font-semibold text-sm">colors</h5>
                <div className="flex items-center flex-wrap gap-2">
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
                          className={`flex items-center justify-center bg-transparent border-none tracking-wide cursor-pointer capitalize text-sm transition-colors ${color === 'all' ? 'text-primary-5 font-medium' : 'text-grey-5 hover:text-grey-3'}`}
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
                        className={`inline-flex w-5 h-5 rounded-full border-none cursor-pointer items-center justify-center transition-all duration-200 ${
                          color === c
                            ? 'ring-2 ring-offset-1 ring-primary-5 scale-110'
                            : 'opacity-60 hover:opacity-90'
                        }`}
                        data-color={c}
                        onClick={(e) =>
                          updateFilter(e.currentTarget.name, e.currentTarget.dataset.color || '')
                        }
                      >
                        {color === c ? <FaCheck className="text-[0.45rem] text-white" /> : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              <PriceSlider
                price={price}
                min_price={min_price}
                max_price={max_price}
                onCommit={(val) => updateFilter('price', val)}
              />

              <div className="mb-5 flex items-center gap-x-2.5 text-sm">
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
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                    shipping ? 'bg-primary-5' : 'bg-grey-7'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      shipping ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
        <button
          type="button"
          className={`${open ? 'block' : 'hidden'} md:block text-sm text-red-dark font-medium bg-transparent border-none cursor-pointer hover:underline`}
          onClick={() => {
            clearFilters(products);
          }}
        >
          Clear all filters
        </button>
      </div>
    </section>
  );
};

export default Filters;

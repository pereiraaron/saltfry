import {
  APPLY_FILTERS,
  CLEAR_FILTERS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  SORT_HIGHEST_PRICE,
  SORT_LOWEST_PRICE,
  SORT_NAME_A_Z,
  SORT_NAME_Z_A,
  UPDATE_FILTERS,
} from '../constants/productScreenConstants';
import { Action, ProductScreenState } from '../types';

const initialState: ProductScreenState = {
  filteredProducts: [],
  type: '',
  gridView: true,
  filters: {
    filterkeyword: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

export const productScreenReducer = (
  state: ProductScreenState = initialState,
  action: Action
): ProductScreenState => {
  switch (action.type) {
    case SORT_LOWEST_PRICE:
      try {
        let maxPrice = action.payload.map((p: $TSFixMe) => p.price);
        maxPrice = Math.max(...maxPrice);
        const lowtohighProducts = action.payload.sort((a: $TSFixMe, b: $TSFixMe) => {
          return a.price - b.price;
        });

        return {
          ...state,
          loading: false,
          filteredProducts: lowtohighProducts,
          sorttype: 'SORT_LOWEST_PRICE',
          filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
        };
      } catch (error) {
        return { ...state, filteredProducts: [], error };
      }
    case SORT_HIGHEST_PRICE:
      const hightolowProducts = action.payload.sort((a: $TSFixMe, b: $TSFixMe) => {
        return b.price - a.price;
      });
      return {
        ...state,
        loading: false,
        filteredProducts: hightolowProducts,
        sorttype: 'SORT_HIGHEST_PRICE',
      };

    case SORT_NAME_A_Z:
      const azProducts = action.payload.sort((a: $TSFixMe, b: $TSFixMe) => {
        return a.name.localeCompare(b.name);
      });
      return {
        ...state,
        loading: false,
        filteredProducts: azProducts,
        sorttype: 'SORT_NAME_A_Z',
      };

    case SORT_NAME_Z_A:
      const zaProducts = action.payload.sort((a: $TSFixMe, b: $TSFixMe) => {
        return b.name.localeCompare(a.name);
      });
      return {
        ...state,
        loading: false,
        filteredProducts: zaProducts,
        sorttype: 'SORT_NAME_Z_A',
      };
    case SET_GRIDVIEW:
      return { ...state, gridView: true };
    case SET_LISTVIEW:
      return { ...state, gridView: false };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };

    case APPLY_FILTERS:
      const { filters, products } = action.payload;
      const { filterkeyword, category, company, color, price, shipping } = filters;
      let tempProducts = products;
      if (filterkeyword) {
        tempProducts = tempProducts.filter((product: $TSFixMe) =>
          product.name.toLowerCase().startsWith(filterkeyword)
        );
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter((product: $TSFixMe) => product.category === category);
      }
      if (company !== 'all') {
        tempProducts = tempProducts.filter((product: $TSFixMe) => product.company === company);
      }
      if (color !== 'all') {
        tempProducts = tempProducts.filter((product: $TSFixMe) => {
          return product.colors.find((c: string) => c === color);
        });
      }
      // filter by price
      tempProducts = tempProducts.filter((product: $TSFixMe) => product.price <= price);
      // filter by shipping
      if (shipping) {
        tempProducts = tempProducts.filter((product: $TSFixMe) => product.shipping === true);
      }
      return {
        ...state,
        loading: false,
        filteredProducts: tempProducts,
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        filteredProducts: action.payload,
        filters: {
          ...state.filters,
          filterkeyword: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      };
    default:
      return state;
  }
};

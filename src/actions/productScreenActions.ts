import {
  APPLY_FILTERS,
  CLEAR_FILTERS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_FILTERS,
} from '../constants/productScreenConstants';
// Types are now global - no import needed

export const sortProducts = (sorttype: string, products: $TSFixMe[]) => (dispatch: $TSFixMe) => {
  dispatch({ type: sorttype, payload: products });
};

export const setGridView = () => (dispatch: $TSFixMe) => {
  dispatch({ type: SET_GRIDVIEW });
};

export const setListView = () => (dispatch: $TSFixMe) => {
  dispatch({ type: SET_LISTVIEW });
};

export const updateFilters = (name: string, value: $TSFixMe) => (dispatch: $TSFixMe) => {
  dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
};

export const clearFilters = (products: $TSFixMe[]) => (dispatch: $TSFixMe) => {
  dispatch({ type: CLEAR_FILTERS, payload: products });
};

export const applyFilters = (filters: $TSFixMe, products: $TSFixMe[]) => (dispatch: $TSFixMe) => {
  dispatch({ type: APPLY_FILTERS, payload: { filters, products } });
};


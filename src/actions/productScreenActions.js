import {
  APPLY_FILTERS,
  CLEAR_FILTERS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_FILTERS,
} from '../constants/productScreenConstants';

export const sortProducts = (sorttype, products) => (dispatch) => {
  dispatch({ type: sorttype, payload: products });
};

export const setGridView = () => (dispatch) => {
  dispatch({ type: SET_GRIDVIEW });
};
export const setListView = () => (dispatch) => {
  dispatch({ type: SET_LISTVIEW });
};

export const updateFilters = (name, value) => (dispatch) => {
  dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
};
export const clearFilters = (products) => (dispatch) => {
  dispatch({ type: CLEAR_FILTERS, payload: products });
};
export const applyFilters = (filters, products) => (dispatch) => {
  dispatch({ type: APPLY_FILTERS, payload: { filters, products } });
};

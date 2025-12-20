import {
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';
import { Action, ProductListState, ProductDetailState } from '../types';

export const productListReducer = (
  state: ProductListState = { products: [] },
  action: Action
): ProductListState => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAILURE:
      return { loading: false, error: action.payload, products: [] };
    default:
      return state;
  }
};

export const productDetailReducer = (
  state: ProductDetailState = { product: null },
  action: Action
): ProductDetailState => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAILURE:
      return { loading: false, error: action.payload, product: null };
    default:
      return state;
  }
};


import axios from 'axios';
import {
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';
// Types are now global - no import needed

const url = import.meta.env.VITE_BASE_URL;

export const listProducts = () => async (dispatch: $TSFixMe) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`${url}/react-store-products`);
    // const data = products;
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error: $TSFixMe) {
    dispatch({
      type: PRODUCT_LIST_FAILURE,
      payload: error.message,
    });
  }
};

export const listProductDetails = (id: string) => async (dispatch: $TSFixMe) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${url}/react-store-single-product?id=${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error: $TSFixMe) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload: error.message,
    });
  }
};

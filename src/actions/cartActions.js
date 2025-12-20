import {
  CART_ADD_ITEM,
  CART_ITEM_QUANTITY_FAILURE,
  CART_ITEM_QUANTITY_UPDATE,
  CART_REMOVE_ITEM,
  CLEAR_CART,
} from '../constants/cartConstants';
import axios from 'axios';
const url = import.meta.env.VITE_BASE_URL;

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${url}/react-store-single-product?id=${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: data.id,
        name: data.name,
        image: data.images[0].url,
        price: data.price,
        color: data.color,
        quantity: qty,
        stock: data.stock,
      },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
};

export const incrementProductQuantity = (id, currentqty, total) => (dispatch, getState) => {
  if (currentqty + 1 <= total) {
    dispatch({
      type: CART_ITEM_QUANTITY_UPDATE,
      payload: { id, quantity: currentqty + 1 },
    });
  } else {
    dispatch({
      type: CART_ITEM_QUANTITY_FAILURE,
      error: 'There are no more products available in stock',
    });
  }
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const decrementProductQuantity = (id, currentqty) => (dispatch, getState) => {
  if (currentqty <= 1) {
    dispatch({
      type: CART_ITEM_QUANTITY_FAILURE,
      error: "Product count can't be negative",
    });
  } else {
    dispatch({
      type: CART_ITEM_QUANTITY_UPDATE,
      payload: { id, quantity: currentqty - 1 },
    });
  }
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

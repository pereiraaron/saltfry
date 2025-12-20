import {
  CART_ADD_ITEM,
  CART_ITEM_QUANTITY_FAILURE,
  CART_ITEM_QUANTITY_UPDATE,
  CART_REMOVE_ITEM,
  CLEAR_CART,
} from '../constants/cartConstants';
import { Action, CartState } from '../types';

export const cartReducer = (
  state: CartState = { cartItems: [] },
  action: Action
): CartState => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.id === existItem.id ? item : x)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };
    case CLEAR_CART:
      return { ...state, cartItems: [] };

    case CART_ITEM_QUANTITY_UPDATE:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case CART_ITEM_QUANTITY_FAILURE:
      return { ...state, error: action.error };

    default:
      return state;
  }
};


import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { sidebarReducer } from './reducers/sidebarReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { productDetailReducer, productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { productScreenReducer } from './reducers/productScreenReducer';
import { RootState, CartItem, UserInfo } from './types';

const reducer = combineReducers({
  sidebar: sidebarReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  productScreen: productScreenReducer,
});

const cartItemsFromStorage: CartItem[] = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems')!)
  : [];

const userInfoFromStorage: UserInfo | null = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;

const initialState: Partial<RootState> = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';
import { Action, UserLoginState, UserRegisterState } from '../types';

export const userLoginReducer = (
  state: UserLoginState = { userInfo: null },
  action: Action
): UserLoginState => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, userInfo: null };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload, userInfo: null };
    case USER_LOGOUT:
      return { userInfo: null };
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state: UserRegisterState = { userInfo: null },
  action: Action
): UserRegisterState => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, userInfo: null };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAILURE:
      return { loading: false, error: action.payload, userInfo: null };
    default:
      return state;
  }
};

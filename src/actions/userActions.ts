import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGIN_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from '../constants/userConstants';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
// Types are now global - no import needed

export const login = (email: string, password: string) => async (dispatch: $TSFixMe) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user.displayName);
    const data = { email: user.email, name: user.displayName };

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error: $TSFixMe) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.message,
    });
  }
};

export const register = (displayName: string, email: string, password: string) => async (dispatch: $TSFixMe) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName });

    const data = { email: user.email, name: user.displayName };

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error: $TSFixMe) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: error.message,
    });
  }
};

export const logout = () => async (dispatch: $TSFixMe) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};


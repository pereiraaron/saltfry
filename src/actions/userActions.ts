import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGIN_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from '../constants/userConstants';
// Types are now global - no import needed

// Mock authentication - replace with your actual auth service
export const login = (email: string, _password: string) => async (dispatch: $TSFixMe) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    // TODO: Replace with actual authentication API call
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const data = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      token: `mock-token-${Date.now()}`,
    };

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error: $TSFixMe) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.message || 'Login failed',
    });
  }
};

export const register =
  (displayName: string, email: string, _password: string) => async (dispatch: $TSFixMe) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      // TODO: Replace with actual registration API call
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const data = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: displayName,
        token: `mock-token-${Date.now()}`,
      };

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: $TSFixMe) {
      console.log(error);
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload: error.message || 'Registration failed',
      });
    }
  };

export const logout = () => async (dispatch: $TSFixMe) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

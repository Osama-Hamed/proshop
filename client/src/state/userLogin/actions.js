import * as actionTypes from './types';
import api from '../../shared/api';

const userLoginRequest = () => ({ type: actionTypes.USER_LOGIN_REQUEST });

const userLoginFail = err => ({
  type: actionTypes.USER_LOGIN_FAIL,
  payload: err,
});

export const userLoginSuccess = user => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  payload: user,
});

export const login = (email, password) => async dispatch => {
  try {
    dispatch(userLoginRequest());
    const {
      data: { user },
    } = await api.user.login({ email, password });
    dispatch(userLoginSuccess(user));
    localStorage.setItem('authUser', JSON.stringify(user));
  } catch (err) {
    dispatch(
      userLoginFail(
        err.response && err.response.data.errors[0].message
          ? err.response.data.errors[0].message
          : err.message,
      ),
    );
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('authUser');
  dispatch({ type: actionTypes.USER_LOGOUT });
};

import * as actionTypes from './types';
import api from '../../shared/api';
import * as userLoginActions from '../userLogin/actions';

const userRegistrationRequest = () => ({
  type: actionTypes.USER_REGISTRATION_REQUEST,
});

const userRegistrationFail = err => ({
  type: actionTypes.USER_REGISTRATION_FAIL,
  payload: err,
});

const userRegistrationSuccess = user => ({
  type: actionTypes.USER_REGISTRATION_SUCCESS,
  payload: user,
});

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch(userRegistrationRequest());
    const {
      data: { user },
    } = await api.user.register({ name, email, password });
    dispatch(userRegistrationSuccess(user));
    dispatch(userLoginActions.userLoginSuccess(user));
    localStorage.setItem('authUser', JSON.stringify(user));
  } catch (err) {
    dispatch(
      userRegistrationFail(
        err.response && err.response.data.errors
          ? err.response.data.errors
          : err.message,
      ),
    );
  }
};

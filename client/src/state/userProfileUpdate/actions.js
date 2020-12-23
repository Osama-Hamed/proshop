import * as actionTypes from './types';
import api from '../../shared/api';
import * as userLoginActions from '../userLogin/actions';
import * as userProfileActions from '../userProfile/actions';

const userProfileUpdateRequest = () => ({
  type: actionTypes.USER_PROFILE_UPDATE_REQUEST,
});

const userProfileUpdateFail = err => ({
  type: actionTypes.USER_PROFILE_UPDATE_FAIL,
  payload: err,
});

const userProfileUpdateSuccess = user => ({
  type: actionTypes.USER_PROFILE_UPDATE_SUCCESS,
  payload: user,
});

export const updateUserProfile = (name, email, password) => async dispatch => {
  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) updateData.password = password;
  try {
    dispatch(userProfileUpdateRequest());
    const {
      data: { user },
    } = await api.user.updateUserProfile(updateData);
    dispatch(userProfileUpdateSuccess(user));
    dispatch(userLoginActions.userLoginSuccess(user));
    dispatch(userProfileActions.userProfileSuccess(user));
    localStorage.setItem('authUser', JSON.stringify(user));
  } catch (err) {
    dispatch(
      userProfileUpdateFail(
        err.response && err.response.data.errors
          ? err.response.data.errors
          : err.message,
      ),
    );
  }
};

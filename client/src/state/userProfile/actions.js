import * as actionTypes from './types';
import api from '../../shared/api';

const userProfileRequest = () => ({
  type: actionTypes.USER_PROFILE_REQUEST,
});

const userProfileFail = err => ({
  type: actionTypes.USER_PROFILE_FAIL,
  payload: err,
});

export const userProfileSuccess = user => ({
  type: actionTypes.USER_PROFILE_SUCCESS,
  payload: user,
});

export const fetchUserProfile = () => async dispatch => {
  try {
    dispatch(userProfileRequest());
    const {
      data: { user },
    } = await api.user.getUserProfile();
    dispatch(userProfileSuccess(user));
  } catch (err) {
    dispatch(
      userProfileFail(
        err.response && err.response.data.errors[0].message
          ? err.response.data.errors[0].message
          : err.message,
      ),
    );
  }
};

import * as actionTypes from './types';

const INITIAL_STATE = {
  user: null,
  loading: false,
  success: false,
  error: null,
};

export const userProfileUpdateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.USER_PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    case actionTypes.USER_PROFILE_UPDATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actionTypes.USER_PROFILE_UPDATE_SUCCESS:
      return { ...state, user: action.payload, loading: false, success: true };
    default:
      return state;
  }
};

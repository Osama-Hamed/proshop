import * as actionTypes from './types';

const INITIAL_STATE = {
  authUser: null,
  loading: false,
  error: null,
};

export const userLoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return { ...state, authUser: null, loading: true, error: null };
    case actionTypes.USER_LOGIN_FAIL:
      return { ...state, error: action.payload, loading: false };
    case actionTypes.USER_LOGIN_SUCCESS:
      return { ...state, authUser: action.payload, loading: false };
    case actionTypes.USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

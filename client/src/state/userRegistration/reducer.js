import * as actionTypes from './types';

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

export const userRegistrationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTRATION_REQUEST:
      return { ...state, user: null, loading: true, error: null };
    case actionTypes.USER_REGISTRATION_FAIL:
      return { ...state, error: action.payload, loading: false };
    case actionTypes.USER_REGISTRATION_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    default:
      return state;
  }
};

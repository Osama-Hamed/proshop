import * as actionTypes from './types';

const INITIAL_STATE = {
  product: null,
  loading: false,
  error: null,
};

export const productDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_DETAILS_REQUEST:
      return { ...state, product: null, loading: true, error: null };
    case actionTypes.PRODUCT_DETAILS_FAIL:
      return { ...state, error: action.payload, loading: false };
    case actionTypes.PRODUCT_DETAILS_SUCCESS:
      return { ...state, product: action.payload, loading: false };
    default:
      return state;
  }
};

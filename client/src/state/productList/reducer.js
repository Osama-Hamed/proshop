import * as actionTypes from './types';

const INITIAL_STATE = {
  products: [],
  loading: false,
  error: null,
};

export const productListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_LIST_REQUEST:
      return { ...state, products: [], loading: true, error: null };
    case actionTypes.PRODUCT_LIST_FAIL:
      return { ...state, error: action.payload, loading: false };
    case actionTypes.PRODUCT_LIST_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    default:
      return state;
  }
};

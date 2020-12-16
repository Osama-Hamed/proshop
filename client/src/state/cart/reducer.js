import * as actionTypes from './types';

const INITIAL_STATE = {
  cartItems: [],
};

export const CartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CART_ADD_ITEM:
      const item = action.payload;
      const existedItem = state.cartItems.find(
        i => i.product._id === item.product._id,
      );
      return existedItem
        ? {
            ...state,
            cartItems: state.cartItems.map(i =>
              i.product._id === existedItem.product._id ? item : i,
            ),
          }
        : { ...state, cartItems: [...state.cartItems, item] };
    case actionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item.product._id !== action.payload,
        ),
      };
    default:
      return state;
  }
};

import * as actionTypes from './types';
import api from '../../shared/api';

const addTocart = item => ({ type: actionTypes.CART_ADD_ITEM, payload: item });

export const fetchProductDetails = (id, qty) => async (dispatch, getState) => {
  try {
    const {
      data: { product },
    } = await api.product.getProductById(id);
    dispatch(addTocart({ product, qty }));
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems),
    );
  } catch (err) {
    console.log(err);
  }
};

export const removeFromCart = id => (dispatch, getState) => {
  dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: id });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

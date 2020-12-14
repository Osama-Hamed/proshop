import * as actionTypes from './types';
import api from '../../shared/api';

const productListRequest = () => ({ type: actionTypes.PRODUCT_LIST_REQUEST });

const productListFail = err => ({
  type: actionTypes.PRODUCT_LIST_FAIL,
  payload: err,
});

const productListSuccess = products => ({
  type: actionTypes.PRODUCT_LIST_SUCCESS,
  payload: products,
});

export const fetchProductList = () => async dispatch => {
  try {
    dispatch(productListRequest());
    const {
      data: { products },
    } = await api.product.getProducts();
    dispatch(productListSuccess(products));
  } catch (err) {
    dispatch(
      productListFail(
        err.response && err.response.data.errors[0].message
          ? err.response.data.errors[0].message
          : err.message,
      ),
    );
  }
};

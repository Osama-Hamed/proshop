import * as actionTypes from './types';
import api from '../../shared/api';

const productDetailsRequest = () => ({
  type: actionTypes.PRODUCT_DETAILS_REQUEST,
});

const productDetailsFail = err => ({
  type: actionTypes.PRODUCT_DETAILS_FAIL,
  payload: err,
});

const productDetailsSuccess = product => ({
  type: actionTypes.PRODUCT_DETAILS_SUCCESS,
  payload: product,
});

export const fetchProductDetails = id => async dispatch => {
  console.log(id);
  try {
    dispatch(productDetailsRequest());
    const {
      data: { product },
    } = await api.product.getProductById(id);
    // console.log('=======================', product);
    dispatch(productDetailsSuccess(product));
  } catch (err) {
    dispatch(
      productDetailsFail(
        err.response && err.response.data.errors[0].message
          ? err.response.data.errors[0].message
          : err.message,
      ),
    );
  }
};

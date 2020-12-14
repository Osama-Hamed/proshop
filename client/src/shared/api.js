import axios from 'axios';

const API_ROOT = 'http://localhost:4000/api';

const apiRoutes = {
  product: {
    getProducts: () => `${API_ROOT}/product`,
    getProductById: id => `${API_ROOT}/product/${id}`,
  },
};

const request = {
  get: url => axios.get(url),
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  product: {
    getProducts: () => request.get(apiRoutes.product.getProducts()),
    getProductById: id => request.get(apiRoutes.product.getProductById(id)),
  },
};

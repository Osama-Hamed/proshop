import axios from 'axios';

const API_ROOT = 'http://localhost:4000/api';

const getConfig = () => {
  const authUser = JSON.parse(localStorage.getItem('authUser'));

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authUser ? `Bearer ${authUser.token}` : null,
    },
  };
};

const request = {
  get: url => axios.get(url),
  post: (url, data) => axios.post(url, data, getConfig()),
};

const apiRoutes = {
  product: {
    getProducts: () => `${API_ROOT}/product`,
    getProductById: id => `${API_ROOT}/product/${id}`,
  },
  user: {
    login: () => `${API_ROOT}/user/login`,
    register: () => `${API_ROOT}/user/register`,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  product: {
    getProducts: () => request.get(apiRoutes.product.getProducts()),
    getProductById: id => request.get(apiRoutes.product.getProductById(id)),
  },
  user: {
    login: data => request.post(apiRoutes.user.login(), data),
    register: data => request.post(apiRoutes.user.register(), data),
  },
};

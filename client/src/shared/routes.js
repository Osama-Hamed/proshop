import queryString from 'query-string';

/* eslint-disable import/no-anonymous-default-export */
export default {
  homeScreen: {
    path: () => '/',
    component: () => import('../screens/HomeScreen'),
  },
  productScreen: {
    path: (id = ':id') => `/product/${id}`,
    component: () => import('../screens/ProductScreen'),
  },
  cartScreen: {
    path: (id = ':id?', params = {}) =>
      `/cart/${id}${
        Object.keys(params).length ? `?${queryString.stringify(params)}` : ''
      }`,
    component: () => import('../screens/CartScreen'),
  },
  loginScreen: {
    path: () => `/login`,
    component: () => import('../screens/LoginScreen'),
  },
};

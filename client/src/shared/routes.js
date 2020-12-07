/* eslint-disable import/no-anonymous-default-export */
export default {
  homeScreen: { path: '/', component: () => import('../screens/HomeScreen') },
  productScreen: {
    path: '/product/:id',
    component: () => import('../screens/ProductScreen'),
  },
};

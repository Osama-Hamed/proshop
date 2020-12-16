import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { productListReducer } from './productList/reducer';
import { productDetailsReducer } from './productDetails/reducer';
import { CartReducer } from './cart/reducer';

let cachedCartItems = localStorage.getItem('cartItems');
cachedCartItems = cachedCartItems ? JSON.parse(cachedCartItems) : [];

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: CartReducer,
});
const useLogger = process.env.NODE_ENV === 'development';
const middlewares = useLogger
  ? applyMiddleware(reduxThunk, createLogger())
  : applyMiddleware(reduxThunk);

const store = createStore(
  reducer,
  { cart: { cartItems: cachedCartItems } },
  middlewares,
);

export default store;

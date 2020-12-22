import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { productListReducer } from './productList/reducer';
import { productDetailsReducer } from './productDetails/reducer';
import { cartReducer } from './cart/reducer';
import { userLoginReducer } from './userLogin/reducer';
import { userRegistrationReducer } from './userRegistration/reducer';

let cachedCartItems = localStorage.getItem('cartItems');
cachedCartItems = cachedCartItems ? JSON.parse(cachedCartItems) : [];
let authUser = localStorage.getItem('authUser');
authUser = authUser ? JSON.parse(authUser) : null;

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegistration: userRegistrationReducer,
});
const useLogger = process.env.NODE_ENV === 'development';
const middlewares = useLogger
  ? applyMiddleware(reduxThunk, createLogger())
  : applyMiddleware(reduxThunk);

const store = createStore(
  reducer,
  { cart: { cartItems: cachedCartItems }, userLogin: { authUser } },
  middlewares,
);

export default store;

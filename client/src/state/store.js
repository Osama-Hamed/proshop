import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { productListReducer } from './productList/reducer';
import { productDetailsReducer } from './productDetails/reducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});
const useLogger = process.env.NODE_ENV === 'development';
const middlewares = useLogger
  ? applyMiddleware(reduxThunk, createLogger())
  : applyMiddleware(reduxThunk);

const store = createStore(reducer, {}, middlewares);

export default store;

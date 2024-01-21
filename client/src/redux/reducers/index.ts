import { combineReducers } from 'redux';

import authReducer from './auth';
import ownedStocksReducer from './ownedStocks';

const reducers = combineReducers({ authReducer, ownedStocksReducer });

export default reducers;

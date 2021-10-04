import { combineReducers } from 'redux';

import stocksReducer from './stocks';

const reducers = combineReducers({ stocksReducer });

export default reducers;

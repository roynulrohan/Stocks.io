import { SET_STOCKS, SET_ONE_STOCK } from '../actions/actions';
import IAction from '../actions/IAction';

const stocksReducer = (stocks = [], action: IAction) => {
    switch (action.type) {
        case SET_STOCKS:
            return action.payload;
        case SET_ONE_STOCK:
            return action.payload;
        default:
            return stocks;
    }
};

export default stocksReducer;

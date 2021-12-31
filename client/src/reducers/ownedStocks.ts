import { OWNED_STOCKS } from '../constants/actions';

const ownedStocksReducer = (state = { ownedStocks: null }, action: any) => {
    switch (action.type) {
        case OWNED_STOCKS:
            return { ...state, ownedStocks: action?.payload };
        default:
            return state;
    }
};

export default ownedStocksReducer;

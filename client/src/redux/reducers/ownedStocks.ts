import { OWNED_STOCKS, UPDATE_STOCK } from '../actions';

const ownedStocksReducer = (state = { ownedStocks: [] }, action: any) => {
    const stocks: any = JSON.parse(JSON.stringify(state.ownedStocks));

    switch (action.type) {
        case OWNED_STOCKS:
            return { ...state, ownedStocks: action?.payload };
        case UPDATE_STOCK:
            if (action?.payload?.stock?.ownedStock.shares === 0) {
                delete stocks[action?.payload?.ticker];
            } else {
                stocks[action?.payload?.ticker] = action?.payload?.stock?.ownedStock;
            }
            return { ...state, ownedStocks: stocks };
        default:
            return state;
    }
};

export default ownedStocksReducer;

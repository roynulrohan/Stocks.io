import { Stock } from '../../__generated__/graphql';
import { OWNED_STOCKS, UPDATE_STOCK } from '../actions';

const ownedStocksReducer = (state = { ownedStocks: [] }, action: any) => {
    const stocks: Stock[] = JSON.parse(JSON.stringify(state.ownedStocks));

    switch (action.type) {
        case OWNED_STOCKS:
            return { ...state, ownedStocks: action?.payload };
        case UPDATE_STOCK:
            if (action?.payload?.stock?.shares === 0) {
                stocks.splice(
                    stocks.findIndex((stock) => stock.ticker === action?.payload?.ticker),
                    1
                );
            } else {
                stocks.push(action?.payload?.stock);
            }
            return { ...state, ownedStocks: stocks };
        default:
            return state;
    }
};

export default ownedStocksReducer;

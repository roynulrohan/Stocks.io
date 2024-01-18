import { OwnedStock } from "./__generated__/graphql";

interface Stock {
    ticker: string;
    name: string;
    price: number;
    exchange: string;
    industry: string;
    logo: string;
    ipo: string;
    country: string;
    currency: string;
    weburl: string;
}

interface User {
    _id: string;
    username: string;
    balance: number;
}

interface StockUpdate {
    price: number;
}

interface StockState {
    stocksReducer: StockUpdate;
}

interface AuthData {
    user: User;
    token: string;
}

interface AuthReducer {
    authData: AuthData;
}

interface AuthState {
    authReducer: AuthReducer;
}

interface OwnedStocksReducer {
    ownedStocks: OwnedStock[];
}

interface OwnedStocksState {
    ownedStocksReducer: OwnedStocksReducer;
}

export type { Stock, StockUpdate, StockState, AuthState, OwnedStocksState };

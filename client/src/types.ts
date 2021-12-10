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
}

interface StockUpdate {
    price: number;
    prevPrice: number;
}

interface RootState {
    stocksReducer: StockUpdate;
}

export type { Stock, StockUpdate, RootState };

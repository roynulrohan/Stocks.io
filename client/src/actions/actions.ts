export const SET_STOCKS = 'SET_STOCKS';
export const SET_ONE_STOCK = 'SET_ONE_STOCK';
export const ADD_PURCHASED = 'ADD_PURCHASED';
export const UPDATE_PURCHASED = 'UPDATE_PURCHASED';
export const REMOVE_PURCHASED = 'REMOVE_PURCHASED';

export const setStocks = (payload?: []) => {
    return { type: SET_STOCKS, payload };
};

export const setOneStock = (payload?: {}) => {
    return { type: SET_ONE_STOCK, payload };
};



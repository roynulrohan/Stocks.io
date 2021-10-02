import { Stock, StockTC } from '../models/Stock';

const StockQuery = {
    stockFindOne: StockTC.getResolver('findOne'),
};


export { StockQuery };

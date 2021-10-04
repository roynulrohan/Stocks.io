import { Stock, StockTC } from '../models/Stock';

const StockQuery = {
    stockFindOne: StockTC.getResolver('findOne'),
    stockFindMany: StockTC.getResolver('findMany'),
};

export { StockQuery };

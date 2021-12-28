import { merge } from 'lodash';
import { StockResolver } from './Stock';
import { UserResolver } from './User';
import { OwnedStockResolver } from './OwnedStock';

export const resolvers = merge(StockResolver, UserResolver, OwnedStockResolver);

import { merge } from 'lodash';
import { StockResolver } from './Stock';
import { UserResolver } from './User';

export const resolvers = merge(StockResolver, UserResolver);

import { makeExecutableSchema } from '@graphql-tools/schema';
import { StockTypeDef } from './Stock';
import { UserTypeDef } from './User';
import { TransactionTypeDef } from './Transaction';
import { OwnedStockTypeDef } from './OwnedStock';
import { resolvers } from '../resolvers';

export default makeExecutableSchema({ typeDefs: [StockTypeDef, UserTypeDef, TransactionTypeDef, OwnedStockTypeDef], resolvers });

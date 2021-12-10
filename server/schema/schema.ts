import { makeExecutableSchema } from '@graphql-tools/schema';
import { StockTypeDef } from './Stock';
import { resolvers } from '../resolvers';

export default makeExecutableSchema({ typeDefs: [StockTypeDef], resolvers: resolvers });

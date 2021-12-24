import { makeExecutableSchema } from '@graphql-tools/schema';
import { StockTypeDef } from './Stock';
import { UserTypeDef } from './User';
import { resolvers } from '../resolvers';

export default makeExecutableSchema({ typeDefs: [StockTypeDef, UserTypeDef], resolvers });

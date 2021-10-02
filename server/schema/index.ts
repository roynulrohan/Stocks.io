import { SchemaComposer } from 'graphql-compose';

const schemaComposer = new SchemaComposer();

import { StockQuery } from './stock';

schemaComposer.Query.addFields({
    ...StockQuery,
});

schemaComposer.Mutation.addFields({
    
});

export default schemaComposer.buildSchema();

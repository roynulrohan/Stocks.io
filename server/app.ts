import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { startUpdatingStocks } from './sockets/market';

dotenv.config();

const app = express();

// app.use(
//     '/graphql',
//     graphqlHTTP({
//         schema: graphqlSchema,
//         rootValue: graphqlResolvers,
//         graphiql: true,
//     })
// );

const server = new ApolloServer({ schema });

server.start().then(() => server.applyMiddleware({ app }));

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.oisbb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose
    .connect(uri)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => console.log(`Server is running at http://localhost:${process.env.PORT || 3000}${server.graphqlPath}`));

        startUpdatingStocks();
    })
    .catch((error) => {
        throw error;
    });

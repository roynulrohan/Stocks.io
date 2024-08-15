import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import schema from './graphql/schema';
import { stopUpdatingStockPrices, updateStockPrices } from './sockets/market';

dotenv.config();

interface MyContext {
    token?: String;
}

const app = express();

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

interface MyContext {
    token?: String;
}

const server = new ApolloServer<MyContext>({ schema });

const init = async () => {
    await server.start();

    app.use(
        '/graphql',
        cors({ origin: true, credentials: true }),
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.authorization }),
        })
    );

    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.oisbb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

    mongoose
        .connect(uri)
        .catch((error) => {
            throw error;
        })
        .then(() => {
            console.log('Mongo connection established');
            updateStockPrices(1, 120000, undefined);
        });

    const port = 4000;

    const http = app.listen(port, () => console.log(`Server is running at http://localhost:${port}/graphql`));

    const io = new Server(http, {
        path: '/socket.io',
    });

    io.on('connection', async (socket) => {
        console.log('New socket connection: ', socket?.id);

        updateStockPrices(2, 10000, io);

        socket.on('disconnect', () => {
            if (io.engine.clientsCount === 0) {
                stopUpdatingStockPrices(2);
                console.log('No users connected, stopped 10 second interval for stocks');
            }
        });
    });
};

init();

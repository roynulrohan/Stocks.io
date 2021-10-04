import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { startUpdatingStocks } from './sockets/market';
import schema from './schema';

dotenv.config();

const app = express();
const server = new ApolloServer({ schema });

app.use(express.urlencoded({ extended: true }));
app.use(cors());

server.start().then(() => server.applyMiddleware({ app }));

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.oisbb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose
    .connect(uri)
    .catch((error) => {
        throw error;
    })
    .then(() => {
        console.log('Mongo connection established');
        startUpdatingStocks(undefined, 900000);
        console.log('Started updating all stocks without socket emits');
    });

const http = app.listen(process.env.PORT || 4000, () => console.log(`Server is running at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`));
const io = new Server(http);

let isUpdating = false;

io.on('connection', (socket) => {
    console.log('New socket connection: ', socket?.id);

    if (!isUpdating) {
        console.log('Started updating stocks with socket connection');
        startUpdatingStocks(io, 10000);
        isUpdating = true;
    }
});

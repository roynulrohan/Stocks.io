import mongoose, { Schema } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const StockSchema = new Schema(
    {
        ticker: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        exchange: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        ipo: {
            type: String,
            required: true,
        },
        industry: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },

        currency: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'stocks',
    }
);

export const Stock = mongoose.model('Stock', StockSchema);
export const StockTC = composeWithMongoose(Stock);

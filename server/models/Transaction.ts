import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    ticker: {
        type: String,
        required: true,
    },
    shares: {
        type: Number,
        required: true,
        min: 0,
    },
    investment: {
        type: Number,
        required: true,
        min: 0,
    },
    boughtAt: {
        type: Number,
        required: true,
        min: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export const Transaction = mongoose.model('Transaction', TransactionSchema);

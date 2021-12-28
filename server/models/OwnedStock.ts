import mongoose, { Schema } from 'mongoose';

const OwnedStockSchema = new Schema({
    userId: {
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
    initialInvestment: {
        type: Number,
        required: true,
        min: 0,
    },
});

export const OwnedStock = mongoose.model('OwnedStock', OwnedStockSchema);

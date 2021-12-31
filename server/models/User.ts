import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 500,
        min: 0,
    },
});

export const User = mongoose.model('User', UserSchema);

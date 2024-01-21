import { OwnedStock } from '../../models/OwnedStock';
import { Transaction } from '../../models/Transaction';
import { User } from '../../models/User';
import { verifyToken } from '../../middleware/auth';
import { Stock } from '../../models/Stock';
import { GraphQLError } from 'graphql';

async function clearFirstTransaction(userId) {
    try {
        const countTransactions = await Transaction.find({ userId }).countDocuments();
        if (countTransactions > 50) {
            await Transaction.findOneAndDelete({ userId }, { sort: { ['date']: 1 } });
        }
    } catch (error) {
        return { error: 'Failure to cleanup transaction logs!' };
    }
}

export const OwnedStockResolver = {
    Query: {
        ownedStocks: async (_, args, context) => {
            const { token } = context;

            const result = await verifyToken(token);

            if (result.error) {
                throw new GraphQLError(result.error, {
                    extensions: {
                        code: 'UNAUTHORIZED',
                    },
                });
            }

            const ownedStocks = await OwnedStock.find({ userId: result.userId }).sort({ ['userId']: 1 });

            const stockData = [];

            for (const stock of ownedStocks) {
                const stockInfo = await Stock.findOne({ ticker: stock.ticker });
                stockData.push(stockInfo);
            }

            const merged = ownedStocks.map((stock, index) => {
                return { ...stock.toJSON(), ...stockData[index]._doc };
            })

            return merged;
        },
        ownedStock: async (_, { ticker }, context) => {
            const { token } = context;

            const result = await verifyToken(token);

            if (result.error) {
                throw new GraphQLError(result.error, {
                    extensions: {
                        code: 'UNAUTHORIZED',
                    },
                });
            }

            const ownedStock = await OwnedStock.find({ userId: result.userId, ticker });

            return ownedStock;
        },
    },
    Mutation: {
        buyStock: async (_, { ticker, shares }, context) => {
            const { token } = context;

            const authResult = await verifyToken(token);

            if (authResult.error) {
                throw new GraphQLError(authResult.error, {
                    extensions: {
                        code: 'UNAUTHORIZED',
                    },
                });
            }

            const stock = await Stock.findOne({ ticker });
            const user = await User.findOne({ _id: authResult.userId });
            const alreadyOwned = (await OwnedStock.find({ userId: authResult.userId, ticker }).countDocuments()) > 0;
            const cost = shares * stock.price;

            if (cost > user.balance) {
                throw new GraphQLError("Can't afford transaction. $" + (cost - user.balance).toFixed(2) + ' more required.', {
                    extensions: {
                        code: 'INSUFFICIENT_FUNDS',
                    },
                });
            }

            if (alreadyOwned) {
                const ownedStock = await OwnedStock.findOneAndUpdate(
                    { userId: authResult.userId, ticker },
                    { $inc: { shares, initialInvestment: cost } },
                    { new: true }
                );

                await User.findOneAndUpdate({ _id: authResult.userId }, { $inc: { balance: -cost } });

                const newTransaction = new Transaction({ userId: authResult.userId, type: 'BUY', ticker, shares, totalAmount: cost, stockPrice: stock.price });
                await newTransaction.save();

                clearFirstTransaction(authResult.userId);
                return { ownedStock, price: stock.price, newBalance: user.balance - cost };
            } else {
                const newOwnedStock = new OwnedStock({
                    userId: authResult.userId,
                    ticker,
                    shares,
                    initialInvestment: cost,
                });

                const result = await newOwnedStock.save();
                await User.findOneAndUpdate({ _id: authResult.userId }, { $inc: { balance: -cost } });

                const newTransaction = new Transaction({ userId: authResult.userId, type: 'BUY', ticker, shares, totalAmount: cost, stockPrice: stock.price });
                await newTransaction.save();

                clearFirstTransaction(authResult.userId);
                return { ownedStock: result, newBalance: user.balance - cost };
            }
        },
        sellStock: async (_, { ticker, shares }, context) => {
            const { token } = context;

            const authResult = await verifyToken(token);

            if (authResult.error) {
                throw new GraphQLError(authResult.error, {
                    extensions: {
                        code: 'UNAUTHORIZED',
                    },
                });
            }

            const ownedStock = await OwnedStock.findOne({ userId: authResult.userId, ticker });

            if (!ownedStock) {
                throw new GraphQLError('Stock not owned', {
                    extensions: {
                        code: 'BAD_REQUEST',
                    },
                });
            }

            if (ownedStock.shares < shares) {
                throw new GraphQLError('Invalid shares', {
                    extensions: {
                        code: 'INVALID_SHARES',
                    },
                });
            }

            const stock = await Stock.findOne({ ticker });
            const profit = stock.price * shares;
            const initialInvestment = ownedStock.initialInvestment - (ownedStock.initialInvestment * shares) / ownedStock.shares;

            const result = await OwnedStock.findOneAndUpdate(
                { userId: authResult.userId, ticker },
                { $inc: { shares: -shares }, initialInvestment },
                { new: true }
            );

            const newTransaction = new Transaction({
                userId: authResult.userId,
                type: 'SELL',
                ticker,
                shares,
                totalAmount: profit,
                stockPrice: stock.price,
            });
            await newTransaction.save();

            if (result.shares === 0) {
                await OwnedStock.findOneAndDelete({ userId: authResult.userId, ticker });
            }

            const user = await User.findOneAndUpdate({ _id: authResult.userId }, { $inc: { balance: profit } }, { new: true });

            clearFirstTransaction(authResult.userId);

            return { ownedStock: result, newBalance: user.balance };
        },
    },
};

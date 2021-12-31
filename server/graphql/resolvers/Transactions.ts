import { Transaction } from '../../models/Transaction';
import { verifyToken } from '../../middleware/auth';
import { AuthenticationError } from 'apollo-server-express';

export const TransactionResolver = {
    Query: {
        getTransactions: async (_, args, context) => {
            const token = context.req.headers.authorization;

            const result = verifyToken({ token: token.split(' ')[1] });

            if (result.error) {
                throw new AuthenticationError(result.error);
            }

            const transactions = await Transaction.find({ userId: result.userId }).sort({ ['date']: -1 });

            if (transactions.length > 20) {
                await Transaction.findOneAndDelete({ userId: result.userId }, { sort: { ['date']: 1 } });
            }

            return { transactions };
        },
    },
};

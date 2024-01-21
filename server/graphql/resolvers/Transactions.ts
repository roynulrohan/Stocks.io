import { Transaction } from '../../models/Transaction';
import { verifyToken } from '../../middleware/auth';
import { GraphQLError } from 'graphql';

export const TransactionResolver = {
    Query: {
        transactions: async (_, args, context) => {
            const { token } = context;

            const result = await verifyToken(token);

            if (result.error) {
                throw new GraphQLError(result.error, {
                    extensions: {
                        code: 'UNAUTHORIZED',
                    },
                });
            }

            const transactions = await Transaction.find({ userId: result.userId }).sort({ ['date']: -1 });

            if (transactions.length > 50) {
                await Transaction.findOneAndDelete({ userId: result.userId }, { sort: { ['date']: 1 } });
            }

            return transactions;
        },
    },
};

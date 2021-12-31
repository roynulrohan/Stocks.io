import { gql } from 'apollo-server-express';

export const TransactionTypeDef = gql`
    scalar Date

    type Transaction {
        userId: String!
        type: String!
        ticker: String!
        shares: Int!
        totalAmount: Float!
        stockPrice: Float!
        date: Date!
    }

    type transactions {
        transactions: [Transaction]
    }

    type Query {
        getTransactions: transactions
    }
`;

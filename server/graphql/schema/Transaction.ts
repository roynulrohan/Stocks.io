import { gql } from 'apollo-server-express';

export const TransactionTypeDef = gql`
    type Transaction {
        userId: String!
        type: String!
        ticker: String!
        shares: Int!
        investment: Float!
        boughtAt: Float!
        date: String!
    }

    type transactions {
        transactions: [Transaction]
    }

    type Query {
        getTransactions: transactions
    }
`;

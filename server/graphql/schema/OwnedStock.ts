import { gql } from 'apollo-server-express';

export const OwnedStockTypeDef = gql`
    scalar JSON

    type OwnedStock {
        _id: String!
        userId: String!
        ticker: String!
        shares: Int!
        initialInvestment: Float!
    }

    type ownedStocks {
        ownedStocks: JSON
    }

    type ownedStock {
        ownedStock: OwnedStock
    }

    type Query {
        getOwnedStocks: ownedStocks
        getOwnedStock(ticker: String): ownedStock
    }

    type stockTransactionResponse {
        ownedStock: OwnedStock!
        newBalance: Float!
    }

    type Mutation {
        buyStock(ticker: String!, shares: Int!): stockTransactionResponse
        sellStock(ticker: String!, shares: Int!): stockTransactionResponse
    }
`;

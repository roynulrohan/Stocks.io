import { gql } from 'apollo-server-express';

export const OwnedStockTypeDef = gql`
    type OwnedStock {
        userId: String!
        ticker: String!
        shares: Int!
        initialInvestment: Float!
    }

    type ownedStocks {
        ownedStocks: [OwnedStock]
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
        price: Float!
    }

    type Mutation {
        buyStock(ticker: String!, shares: Int!): stockTransactionResponse
        sellStock(ticker: String!, shares: Int!): stockTransactionResponse
    }
`;

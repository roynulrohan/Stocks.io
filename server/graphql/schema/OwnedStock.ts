export const OwnedStockTypeDef = `#graphql
    scalar JSON

    type OwnedStock {
        _id: String!
        userId: String!
        ticker: String!
        shares: Int!
        initialInvestment: Float!
    }

    type Query {
        ownedStocks: [OwnedStock]!
        ownedStock(ticker: String): OwnedStock!
    }

    type stockTransactionResponse {
        ownedStock: OwnedStock!
        newBalance: Float!
    }

    type Mutation {
        buyStock(ticker: String!, shares: Int!): stockTransactionResponse!
        sellStock(ticker: String!, shares: Int!): stockTransactionResponse!
    }
`;

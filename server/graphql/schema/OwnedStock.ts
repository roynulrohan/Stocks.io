export const OwnedStockTypeDef = `#graphql
    scalar JSON

    type OwnedStock implements Stock {
        _id: String!
        userId: String!
        ticker: String!
        shares: Int!
        initialInvestment: Float!
        name: String!
        exchange: String!
        price: Float!
        logo: String!
        ipo: String!
        industry: String!
        country: String!
        currency: String!
        weburl: String!
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

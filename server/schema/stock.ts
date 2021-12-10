import { gql } from 'apollo-server-express';

export const StockTypeDef = gql`
    type Stock {
        ticker: String!
        name: String!
        exchange: String!
        price: String!
        logo: String!
        ipo: String!
        industry: String!
        country: String!
        currency: String!
        url: String!
    }
    type Stocks {
        stocks: [Stock]
    }

    type Query {
        getStocks(search: String): Stocks
    }
`;

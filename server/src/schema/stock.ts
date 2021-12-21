import { gql } from 'apollo-server-express';

export const StockTypeDef = gql`
    type Stock {
        ticker: String!
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
    type stocks {
        stocks: [Stock]
    }

    type stock {
        stock: Stock
    }

    type Query {
        getStocks(search: String): stocks
        getStock(search: String): stock
    }
`;

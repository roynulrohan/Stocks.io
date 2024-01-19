export const StockTypeDef = `#graphql
    interface Stock {
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

    type StockData implements Stock {
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

    type Query {
        searchStocks(search: String, limit: Int, random: Boolean): [StockData]!
        stock(ticker: String): StockData!
    }
`;

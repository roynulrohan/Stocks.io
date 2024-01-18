export const StockTypeDef = `#graphql
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

    type Query {
        searchStocks(search: String, limit: Int, random: Boolean): [Stock]!
        stock(ticker: String): Stock!
    }
`;

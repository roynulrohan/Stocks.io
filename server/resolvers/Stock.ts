import { Stock } from '../models/Stock';

export const StockResolver = {
    Query: {
        getStocks: async (_, args) => {
            const { search = null } = args;

            let searchQuery = {};

            // run if search is provided
            if (search) {
                searchQuery = {
                    $or: [
                        { ticker: { $regex: search, $options: 'i' } },
                        { name: { $regex: search, $options: 'i' } },
                        { ipo: { $regex: search, $options: 'i' } },
                    ],
                };
            }

            // execute query to search users
            const stocks = await Stock.find(searchQuery);

            return { stocks };
        },
    },
};

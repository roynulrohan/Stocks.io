import { Stock } from '../../models/Stock';

export const StockResolver = {
    Query: {
        getStocks: async (_, args) => {
            const { search = null, limit, random } = args;

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

            if (!random) {
                // execute query to search users
                const stocks = await Stock.find(searchQuery)
                    .sort({ ['name']: 1 })
                    .limit(limit);

                return { stocks };
            } else {
                const stocks = await Stock.aggregate([{ $match: searchQuery }, { $sample: { size: limit } }]).sort({ ['name']: 1 });

                return { stocks };
            }
        },
        getStock: async (_, args) => {
            const { ticker = null } = args;

            // execute query to search users
            const stock = await Stock.findOne({ ticker });

            return { stock };
        },
    },
};

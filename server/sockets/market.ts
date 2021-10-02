import { Stock } from '../models/Stock';

export const updateStockPrices = () => {
    Stock.find({}, (err, stocks) => {
        stocks.forEach((stock: any) => {
            const fluctuationRange = Math.floor(Math.random() * 10);
            const up = Math.round(Math.random());
            let price: number = stock.price;

            if (up) {
                price += Math.random() * fluctuationRange;
            } else {
                price -= Math.random() * fluctuationRange;
            }

            if (price < 0) {
                price = 0.25;
            }

            Stock.findOneAndUpdate({ ticker: stock.ticker }, { price: price.toFixed(2) }, (err, stock) => {
                console.log(stock.ticker + ' updated to ' + price.toFixed(2));
            });
        });
    });
};

export const startUpdatingStocks = () => {
    setInterval(() => {
        updateStockPrices();
    }, 60000);
};

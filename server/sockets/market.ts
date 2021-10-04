import { Stock } from '../models/Stock';

export const updateStockPrices = (io?: any) => {
    update(io).then((updatedStocks) => {
        io?.emit('stock-update', updatedStocks);
        console.log('All stocks updated');
    });
};

const update = async (io?: any) => {
    let updatedStocks = [];
    const stocks: any = await Stock.find({});

    for (let index = 0; index < stocks?.length; index++) {
        const fluctuationRange = Math.floor(Math.random() * 10);
        const up = Math.round(Math.random());
        let price: number = stocks[index]?.price;

        if (up) {
            price += Math.random() * fluctuationRange;
        } else {
            price -= Math.random() * fluctuationRange;
        }

        if (price < 0) {
            price = 0.25;
        }

        await Stock.findOneAndUpdate({ ticker: stocks[index]?.ticker }, { price: price.toFixed(2) }).then(() => {
            updatedStocks.push({ ticker: stocks[index]?.ticker, price: price });
            io?.emit(stocks[index]?.ticker, price);
        });
    }

    return updatedStocks;
};

export const startUpdatingStocks = (io?: any, interval?: number) => {
    setInterval(() => {
        updateStockPrices(io);
    }, interval);
};

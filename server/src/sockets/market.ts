import { Stock } from '../models/Stock';

export const updateStockPrices = async (io?: any) => {
    let updatedStocks = [];
    const stocks: any = await Stock.find({});

    for (let index = 0; index < stocks?.length; index++) {
        const fluctuationRange = Math.floor(Math.random() * 35);
        const up = Math.round(Math.random());
        const sendDelay = Math.random() * (5000 - 1500) + 1500;
        let price: number = stocks[index]?.price;

        if (up) {
            price += Math.random() * fluctuationRange;
        } else {
            price -= Math.random() * fluctuationRange;
        }

        if (price < 0) {
            price = Math.random() * (2 - 0.25) + 0.25;
        }

        await Stock.findOneAndUpdate({ ticker: stocks[index]?.ticker }, { price: parseFloat(price.toFixed(2)) }).then(async () => {
            updatedStocks.push({ ticker: stocks[index]?.ticker, price: parseFloat(price.toFixed(2)) });

            await socketEmit(io, sendDelay, stocks[index]?.ticker, parseFloat(price.toFixed(2)));
        });
    }

    console.log('All stocks updated');
    return updatedStocks;
};

const socketEmit = (io, sendDelay, to, value) => {
    setTimeout(function () {
        io?.emit(to, value);
    }, sendDelay);
};

export const startUpdatingStocks = (io?: any, interval?: number) => {
    setInterval(() => {
        updateStockPrices(io);
    }, interval);
};

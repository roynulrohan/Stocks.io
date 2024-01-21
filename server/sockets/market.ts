import { Server } from 'socket.io';
import { Stock } from '../models/Stock';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

const refreshIntervalIds = {};
export const updateStockPrices = async (id: number, interval: number, io?: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    if (!refreshIntervalIds[id]) {
        console.log(`Started updating all stocks ${io ? 'with' : 'without'} socket emits every ${interval / 1000} seconds`);
        refreshIntervalIds[id] = setInterval(async () => {
            const updatedStocks = [];
            const stocks = await Stock.find({});

            for (let index = 0; index < stocks?.length; index++) {
                const fluctuationRange = Math.floor(Math.random() * 5);
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

                price = parseFloat(price.toFixed(2));

                if (id === 1) {
                    const realPrice = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stocks[index]?.ticker}&token=${process.env.FINNHUB_API_KEY}`);

                    const priceJson = await realPrice.json();

                    if (priceJson?.c) {
                        price = priceJson?.c;
                    }
                }

                await Stock.findOneAndUpdate({ ticker: stocks[index]?.ticker }, { price: parseFloat(price.toFixed(2)) }).then(async () => {
                    updatedStocks.push({ ticker: stocks[index]?.ticker, price: parseFloat(price.toFixed(2)) });

                    socketEmit(io, sendDelay, stocks[index]?.ticker, {
                        price: parseFloat(price.toFixed(2)),
                    });
                });
            }
        }, interval);
    }
};

export const stopUpdatingStockPrices = (id: number) => {
    clearInterval(refreshIntervalIds[id]);
    refreshIntervalIds[id] = null;
};

const socketEmit = (io, sendDelay, to, value) => {
    setTimeout(() => {
        io?.emit(to, value);
    }, sendDelay);
};

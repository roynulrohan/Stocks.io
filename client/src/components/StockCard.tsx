import React, { useEffect, useRef, useState } from 'react';
import PriceChart from '../components/PriceChart';
import PriceChange from '../components/PriceChange';
import { useNavigate } from 'react-router-dom';
import { Stock, StockUpdate } from '../types';
import { motion } from 'framer-motion';
import { useSocket } from '../contexts/useSocket';

interface Props {
    stock: Stock;
}

const StockCard = React.memo(({ stock }: Props) => {
    const socket = useSocket();
    const navigate = useNavigate();
    const [currentPrice, setCurrentPrice] = useState<number>(-1);
    const prevPrice = useRef(stock?.price);

    useEffect(() => {
        if (socket === null) return;

        socket?.on(stock?.ticker, (priceData: StockUpdate) => {
            setCurrentPrice(priceData.price);
        });

        return () => {
            socket && socket?.off(stock?.ticker);
        };
    }, [socket, stock?.ticker]);

    useEffect(() => {
        if (currentPrice !== -1) {
            prevPrice.current = currentPrice;
        }
    }, [currentPrice]);

    const cardOnClick = () => {
        navigate('/stock/' + stock?.ticker);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={cardOnClick}
            className='transition-transform duration-150 flex flex-col justify-center p-0 m-5 sm:m-3 lg:m-3 w-44 h-64 min-w-44 min-h-64 lg:w-60 lg:h-80 select-none shadow-lg bg-gray-100 dark:bg-darkCard dark:text-white rounded-3xl cursor-pointer overflow-hidden transform hover:scale-105 hover:shadow-xl'>
            <div className='h-1/3 xl:h-32 xl:p-5 flex justify-center p-5 sm:pb-0'>
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className='p-2 pb-0 lg:p-5 lg:pb-0 rounded select-none h-full w-full object-contain object-center'
                    src={stock?.logo}
                    alt={stock?.name + ' logo'}
                />
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className='flex flex-col items-center p-2 h-auto text-center'>
                <p className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-1'>{stock?.name}</p>
                <p className='text-xs font-normal text-gray-900 dark:text-gray-300 mb-2'>
                    <span className='dark:text-gray-400'>{stock?.exchange}</span> : <span className='dark:text-gray-400 font-semibold'>{stock?.ticker}</span>
                </p>
                <PriceChange
                    id={stock?.ticker + '-currentPrice'}
                    currentPrice={currentPrice !== -1 ? currentPrice : stock?.price}
                    prevPrice={prevPrice.current}
                    currency={stock?.currency}
                    ticker={stock?.ticker}
                    className='text-xs lg:text-md'
                />
                <PriceChart
                    key={stock?.ticker + ' price change'}
                    id={stock?.ticker + ' price chart'}
                    legendDisplay={false}
                    xDisplay={false}
                    yDisplay={false}
                    initialPrice={stock?.price}
                    currentPrice={currentPrice}
                    ticker={stock?.ticker}
                    styleSet={'h-3/4 w-2/3 p-5'}
                />
            </motion.div>
        </motion.div>
    );
});

export default StockCard;

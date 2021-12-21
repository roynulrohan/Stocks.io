import PriceChart from '../components/PriceChart';
import PriceChange from '../components/PriceChange';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Stock } from '../types';

interface Props {
    ticker: string;
}

const GET_STOCK = gql`
    query GETSTOCK($search: String) {
        getStock(search: $search) {
            stock {
                ticker
                name
                price
                exchange
                industry
                logo
                ipo
                country
                currency
            }
        }
    }
`;

export default function StockPage({ ticker }: Props) {
    const { data } = useQuery(GET_STOCK, {
        variables: { search: ticker },
    });
    const [stockData, setStockData] = useState<Stock>();

    useEffect(() => {
        setStockData(data?.getStock?.stock);
    }, [data]);

    return (
        <div className='flex flex-col justify-center p-5 sm:p-0 m-5 sm:m-3 lg:m-4 w-3/4 h-96 sm:w-44 sm:h-64 lg:w-60 lg:h-80 select-none shadow-lg bg-gray-100 dark:bg-darkCard dark:text-white rounded-3xl cursor-pointer overflow-hidden transform hover:scale-105 hover:shadow-xl'>
            <div className='h-1/3 xl:h-32 xl:p-5 flex justify-center p-5 sm:pb-0'>
                <img
                    className='p-2 pb-0 lg:p-5 lg:pb-0 rounded select-none h-full w-full object-contain object-center'
                    src={stockData?.logo}
                    alt={stockData?.name + ' logo'}
                />
            </div>
            <div className='flex flex-col items-center p-2 h-auto text-center'>
                <p className='text-md md:text-sm font-medium text-gray-900 dark:text-gray-100 mb-1'>{stockData?.name}</p>
                <p className='text-sm md:text-xs font-normal text-gray-900 dark:text-gray-300 mb-2'>
                    <span className='dark:text-gray-400'>{stockData?.exchange}</span> :{' '}
                    <span className='dark:text-gray-400 font-semibold'>{stockData?.ticker}</span>
                </p>
                {stockData?.price && (
                    <PriceChange initialPrice={stockData?.price} currency={stockData?.currency} ticker={ticker} />
                )}
                {stockData?.price && (
                    <PriceChart
                        id={ticker + ' page price chart'}
                        legendDisplay={false}
                        xDisplay={false}
                        yDisplay={false}
                        initialPrice={stockData?.price}
                        ticker={ticker}
                        styleSet={'h-3/4 w-2/3 p-5'}
                    />
                )}
            </div>
        </div>
    );
}

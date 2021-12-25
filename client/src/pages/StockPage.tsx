import PriceChart from '../components/PriceChart';
import PriceChange from '../components/PriceChange';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Stock } from '../types';
import { GET_STOCK } from '../graphql';

interface Props {
    ticker: string;
}

export default function StockPage({ ticker }: Props) {
    const { data } = useQuery(GET_STOCK, {
        variables: { ticker },
    });
    const [stockData, setStockData] = useState<Stock>();

    useEffect(() => {
        setStockData(data?.getStock?.stock);
    }, [data]);

    return (
        <div className='dark:bg-darkBg h-screen w-full items-center'>
            <div className='flex md:justify-center items-start overflow-x-scroll md:overflow-hidden p-20'>
                <div className='dark:bg-darkCard bg-gray-100 rounded-xl flex flex-col justify-between'>
                    <div className='h-32 py-5 w-80 px-10 '>
                        <img
                            className=' w-full lg:px-8 lg:pb-0 rounded select-none h-full object-contain object-center'
                            src={stockData?.logo}
                            alt={stockData?.name + ' logo'}
                        />
                    </div>
                    <a
                        href={stockData?.weburl}
                        className='px-5 py-2 mt-2 dark:bg-darkField text-gray-700 dark:text-gray-200 flex items-center'
                        aria-label='Company Site'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <svg className='text-gray-800 dark:text-white h-6 w-6' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M17.001 20H6.00098C4.89641 20 4.00098 19.1046 4.00098 18V7C4.00098 5.89543 4.89641 5 6.00098 5H10.001V7H6.00098V18H17.001V14H19.001V18C19.001 19.1046 18.1055 20 17.001 20ZM11.701 13.707L10.291 12.293L16.584 6H13.001V4H20.001V11H18.001V7.415L11.701 13.707Z'></path>
                        </svg>
                        <p className='ml-5'>Company Site</p>
                    </a>

                    <div className='px-6 py-4'>
                        <div className='flex items-center text-gray-700 dark:text-gray-200'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
                                />
                            </svg>

                            <h1 className='px-2 text-sm'>Ticker: {stockData?.ticker}</h1>
                        </div>

                        <div className='flex items-center mt-4 text-gray-700 dark:text-gray-200'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' />
                            </svg>

                            <h1 className='px-2 text-sm'>Exchange: {stockData?.exchange}</h1>
                        </div>

                        <div className='flex items-center mt-4 text-gray-700 dark:text-gray-200'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
                                />
                            </svg>

                            <h1 className='px-2 text-sm'>IPO Date: {stockData?.ipo}</h1>
                        </div>

                        <div className='flex items-center mt-4 text-gray-700 dark:text-gray-200'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                />
                            </svg>

                            <h1 className='px-2 text-sm'>Industries: {stockData?.industry}</h1>
                        </div>

                        <div className='mt-6 mb-2 text-gray-700 dark:text-gray-200 text-center sm:block'>
                            <button className='w-full px-20 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none focus:bg-blue-500 dark:focus:bg-blue-600'>
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
                <div className='dark:bg-darkField bg-gray-100 p-10 lg:w-4/6 h-full rounded-lg ml-5'>
                    <div className='flex justify-between'>
                        <h1 className='text-lg font-normal text-center text-gray-800 dark:text-white'>
                            {stockData?.name} <span className='dark:text-gray-400 text-gray-600 font-normal'> - {stockData?.exchange}</span>
                            <span className='dark:text-gray-400 text-gray-600 font-normal'> : {stockData?.ticker}</span>
                        </h1>
                        {stockData?.price && (
                            <PriceChange
                                initialPrice={stockData?.price}
                                currency={stockData?.currency}
                                ticker={ticker}
                                styleset='text-center min-w-34 lg:text-sm text-xs px-4'
                            />
                        )}
                    </div>
                    <div className='mt-10'>
                        <div>
                            {stockData?.price && (
                                <PriceChart
                                    id={ticker + ' page price chart'}
                                    legendDisplay={false}
                                    xDisplay={false}
                                    yDisplay={false}
                                    initialPrice={stockData?.price}
                                    ticker={ticker}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

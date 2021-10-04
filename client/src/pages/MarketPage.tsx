import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PriceChart from '../components/PriceChart';
import PriceChange from '../components/PriceChange';

const GET_STOCKS = gql`
    query {
        stockFindMany {
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
`;

export default function MarketPage() {
    const [stocks, setStocks] = useState([]);
    const stocksUpdate = useSelector((state: any) => state.stocksReducer);
    const { loading, error, data } = useQuery(GET_STOCKS);

    useEffect(() => {
        let tempArr = JSON.parse(JSON.stringify(stocks));

        if (stocksUpdate) {
            for (let index = 0; index < stocks.length; index++) {
                tempArr[index].price = stocksUpdate[index].price;
            }
        }

        setStocks(tempArr);
    }, [stocksUpdate]);

    useEffect(() => {
        setStocks(data?.stockFindMany);
    }, [data]);

    return (
        <div className='dark:bg-darkBg h-full w-full flex flex-col items-center'>
            <div className='mt-20 text-3xl dark:text-white'>Browse the market</div>
            <div className='mt-36 w-full  flex flex-col'>
                <div className='sm:px-4 md:px-10 lg:px-20 xl:px-60'>
                    <input
                        type='text'
                        id='market-search-input'
                        className='w-full h-16 rounded-lg border-transparent flex-2 appearance-none py-2 px-4 border-0 bg-white dark:bg-darkField text-gray-700 dark:text-gray-200 placeholder-gray-400 shadow-md text-base focus:outline-none focus:ring-2 dark:focus:ring-gray-700 focus:border-transparent'
                        placeholder='Search by ticker or company'
                    />
                </div>
                <div className='flex flex-wrap justify-center mt-8'>
                    {stocks?.map((stock: any) => {
                        return (
                            <div className='m-4 w-72 h-96 shadow-md bg-gray-100 dark:bg-darkCard dark:text-white p-4 rounded-3xl hover:shadow-2xl'>
                                <div className='h-36 flex justify-center p-4'>
                                    <img className='p-5 rounded h-full w-max object-fit object-center mb-6' src={stock?.logo} alt={stock?.name + ' logo'} />
                                </div>
                                <div className='flex flex-col items-center h-auto text-center'>
                                    <p className='text-md text-gray-900 dark:text-gray-100 mb-1'>{stock?.name}</p>
                                    <p className='text-sm text-gray-900 dark:text-gray-300 mb-2'>
                                        <span className='dark:text-gray-400'>{stock?.exchange}</span> :{' '}
                                        <span className='dark:text-gray-200'>{stock?.ticker}</span>
                                    </p>
                                    <PriceChange price={stock?.price?.toFixed(2)} currency={stock?.currency} />
                                    <PriceChart
                                        id={stock?.ticker}
                                        legendDisplay={false}
                                        xDisplay={false}
                                        yDisplay={false}
                                        ticker={stock?.ticker}
                                        currPrice={stock?.currentPrice}
                                        styleSet={'h-18 w-44 py-4'}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

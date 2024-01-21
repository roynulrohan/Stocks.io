import { useEffect, useState } from 'react';
import StockCard from '../components/StockCard';
import { GET_STOCKS } from '../graphql';
import { useQuery } from '@apollo/client';

export default function MarketPage() {
    const { data, refetch } = useQuery(GET_STOCKS);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const searchOnChange = (event: any) => {
        setSearchQuery(event?.target?.value);
    };

    useEffect(() => {
        document.title = 'Market | Stocks.io';
    }, []);

    useEffect(() => {
        if (searchQuery !== '') {
            refetch({
                search: searchQuery,
            });
        } else {
            refetch({
                search: '',
            });
        }
    }, [searchQuery, refetch]);

    return (
        <div className='dark:bg-darkBg pb-10 min-h-screen w-full h-full flex flex-col items-center text-center'>
            <div className='mt-40 text-3xl font-medium dark:text-white'>Browse the market.</div>
            <div className='mt-5 text-md px-5 md:text-xl text-gray-600 dark:text-gray-400'>Explore our selection of the biggest names in the industry.</div>
            <div className='mt-20 w-full flex flex-col'>
                <div className='px-8 sm:px-12 md:px-14 lg:px-20 xl:px-60'>
                    <input
                        type='text'
                        id='market-search-input'
                        spellCheck='false'
                        className='w-full text-sm sm:text-base h-16 rounded-lg border-transparent flex-2 appearance-none py-2 px-10 border-0 bg-white dark:bg-darkField text-gray-700 dark:text-gray-200 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 dark:focus:ring-gray-700 focus:border-transparent'
                        placeholder='Search by ticker, company, description'
                        value={searchQuery}
                        onChange={searchOnChange}
                    />
                </div>
                <div className='dark:bg-darkBg flex flex-wrap justify-center mt-10 px-2'>
                    {data?.searchStocks.map((stock: any) => {
                        return <StockCard key={stock.ticker} stock={stock} />;

                        //return <div key={stock.ticker}>{JSON.stringify(stock)}</div>;
                    })}
                </div>
            </div>
        </div>
    );
}

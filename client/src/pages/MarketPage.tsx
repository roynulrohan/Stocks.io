import { gql, useQuery } from '@apollo/client';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Stock, StockUpdate, RootState } from '../types';
import StockCard from '../components/StockCard';

const GET_STOCKS = gql`
    query GETSTOCKS($search: String) {
        getStocks(search: $search) {
            stocks {
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

export default function MarketPage() {
    const { data, refetch } = useQuery(GET_STOCKS);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const searchOnChange = (event: any) => {
        setSearchQuery(event?.target?.value);
    };

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
        <div className='dark:bg-darkBg h-full w-full min-h-screen flex flex-col items-center text-center'>
            <div className='mt-20 text-3xl font-medium dark:text-white'>Browse the market.</div>
            <div className='mt-5 text-md px-5 md:text-xl text-gray-600 dark:text-gray-400'>Explore our selection of the biggest names in the industry.</div>
            <div className='mt-5 text-xs px-5 md:text-sm text-red-400 dark:text-red-400'>* All data is fake and do not represent real stocks</div>
            <div className='mt-20 w-full flex flex-col'>
                <div className='px-8 sm:px-12 md:px-14 lg:px-20 xl:px-60'>
                    <input
                        type='text'
                        id='market-search-input'
                        spellCheck='false'
                        className='w-full text-sm sm:text-base h-16 rounded-lg border-transparent flex-2 appearance-none py-2 px-10 border-0 bg-white dark:bg-darkField text-gray-700 dark:text-gray-200 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 dark:focus:ring-gray-700 focus:border-transparent'
                        placeholder='Search by ticker or company'
                        value={searchQuery}
                        onChange={searchOnChange}
                    />
                </div>
                <div className='dark:bg-darkBg flex flex-wrap justify-center mt-10'>
                    {data?.getStocks?.stocks.map((stock: any) => {
                        return <StockCard key={stock.ticker} stock={stock} />;
                       
                        //return <div key={stock.ticker}>{JSON.stringify(stock)}</div>;
                    })}
                </div>
            </div>
        </div>
    );
}

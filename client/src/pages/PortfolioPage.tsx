import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthState, OwnedStocksState } from '../types';
import { GET_TRANSACTIONS, DEPOSIT, WITHDRAW, CHANGE_USERNAME } from '../graphql';
import { UPDATE_BALANCE, UPDATE_USERNAME } from '../redux/actions';
import { Tab } from '@headlessui/react';
import { useQuery, useMutation } from '@apollo/client';
import StockCard from '../components/StockCard';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const PortfolioPage = () => {
    const ownedStocks = useSelector((state: OwnedStocksState) => state.ownedStocksReducer.ownedStocks);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Portfolio | Stocks.io';
    }, []);

    useEffect(() => {
        console.log(ownedStocks);
    }, [ownedStocks]);

    return (
        <>
            <div className='dark:bg-darkBg pb-10 min-h-screen w-full h-full flex flex-col items-center text-center'>
                <div className='mt-32 text-3xl font-medium dark:text-white'>My Portfolio</div>
                <div className='mt-5 w-full flex flex-col'>
                    <div className='dark:bg-darkBg flex flex-wrap justify-center mt-10 px-2'>
                        {ownedStocks && Object.keys(ownedStocks).map((key) => {
                            return <div key={ownedStocks[key].ticker}>{JSON.stringify(ownedStocks[key])}</div>;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioPage;

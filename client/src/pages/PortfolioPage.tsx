import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { OwnedStock } from '../__generated__/graphql';
import { OwnedStocksState, StockUpdate } from '../types';
import { useSocket } from '../contexts/useSocket';
import PriceChange from '../components/PriceChange';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface PortfolioTableRowProps {
    stock: OwnedStock;
    navigate: NavigateFunction;
}

const PortfolioTableRow = ({ stock, navigate, ...rest }: PortfolioTableRowProps) => {
    const socket = useSocket();
    const [currentPrice, setCurrentPrice] = useState<number>(-1);

    useEffect(() => {
        if (socket === null) return;

        socket?.on(stock.ticker, (priceData: StockUpdate) => {
            setCurrentPrice(priceData.price);
        });

        return () => {
            socket && socket?.off(stock.ticker);
        };
    }, [socket, stock.ticker]);

    return (
        <tr
            {...rest}
            className='bg-white dark:bg-darkCard hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer'
            onClick={() => {
                navigate('/stock/' + stock.ticker);
            }}>
            <td className='px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-xs font-medium text-center'>
                <img className='w-16 h-8 object-contain mx-auto' src={stock.logo} alt={stock?.name + ' logo'} />
            </td>
            <td className='px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-xs font-medium text-center'>
                <p className='text-gray-900 dark:text-white whitespace-no-wrap'>{stock.ticker}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-xs font-medium text-center'>
                <p className='text-gray-900 dark:text-white whitespace-no-wrap h-fit'>{stock.name}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-xs font-medium text-center'>
                <p className='text-gray-900 dark:text-white whitespace-no-wrap'>{stock.shares}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-xs font-medium text-center'>
                <p className='text-gray-900 dark:text-white whitespace-no-wrap'>
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                    }).format(stock.initialInvestment)}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-xs font-medium text-center'>
                <PriceChange
                    currentPrice={(currentPrice !== -1 ? currentPrice : stock?.price || 0) * stock?.shares}
                    prevPrice={stock.initialInvestment}
                    currency={stock.currency}
                    ticker={stock.ticker}
                    styleset='text-center px-4 mx-auto w-fit'
                />
            </td>
        </tr>
    );
};

const PortfolioPage = () => {
    const navigate = useNavigate();
    const ownedStocks = useSelector((state: OwnedStocksState) => state.ownedStocksReducer.ownedStocks);

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
                <div className='mt-10 w-full flex justify-center'>
                    <div className='container rounded-lg relative overflow-x-auto'>
                        <table className='leading-normal w-full h-full'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-5 py-3  border-b border-gray-200 dark:border-gray-800 text-gray-800  dark:text-white text-center text-xs uppercase font-normal'>
                                        Logo
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3  border-b border-gray-200 dark:border-gray-800 text-gray-800  dark:text-white text-center text-xs uppercase font-normal'>
                                        Ticker
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3  border-b border-gray-200 dark:border-gray-800 text-gray-800  dark:text-white text-center text-xs uppercase font-normal'>
                                        Name
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3  border-b border-gray-200 dark:border-gray-800 text-gray-800  dark:text-white text-center text-xs uppercase font-normal'>
                                        Shares
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3  border-b border-gray-200 dark:border-gray-800 text-gray-800  dark:text-white text-center text-xs uppercase font-normal'>
                                        Invested
                                    </th>

                                    <th
                                        scope='col'
                                        className='px-5 py-3  border-b border-gray-200 dark:border-gray-800 text-gray-800  dark:text-white text-center text-xs uppercase font-normal'>
                                        Current Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ownedStocks.map((stock, i) => {
                                    return <PortfolioTableRow stock={stock} navigate={navigate} key={i} />;
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioPage;

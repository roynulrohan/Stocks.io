import PriceChart from '../components/PriceChart';
import PriceChange from '../components/PriceChange';
import { useHistory } from 'react-router-dom';
import { Stock } from '../types';

interface Props {
    stock: Stock;
}

export default function StockCard({ stock }: Props) {
    const history = useHistory();

    const cardOnClick = () => {
        history.push('/stock/' + stock?.ticker);
    };

    return (
        <div
            onClick={cardOnClick}
            className='flex flex-col justify-center p-5 sm:p-0 m-5 sm:m-3 lg:m-4 w-3/4 h-96 sm:w-44 sm:h-64 lg:w-60 lg:h-80 select-none shadow-lg bg-gray-100 dark:bg-darkCard dark:text-white rounded-3xl cursor-pointer overflow-hidden transform hover:scale-105 hover:shadow-xl'>
            <div className='h-1/3 xl:h-32 xl:p-5 flex justify-center p-5 sm:pb-0'>
                <img
                    className='p-2 pb-0 lg:p-5 lg:pb-0 rounded select-none h-full w-full object-contain object-center'
                    src={stock?.logo}
                    alt={stock?.name + ' logo'}
                />
            </div>
            <div className='flex flex-col items-center p-2 h-auto text-center'>
                <p className='text-md md:text-sm font-medium text-gray-900 dark:text-gray-100 mb-1'>{stock?.name}</p>
                <p className='text-sm md:text-xs font-normal text-gray-900 dark:text-gray-300 mb-2'>
                    <span className='dark:text-gray-400'>{stock?.exchange}</span> : <span className='dark:text-gray-400 font-semibold'>{stock?.ticker}</span>
                </p>
                <PriceChange initialPrice={stock?.price} currency={stock?.currency} ticker={stock?.ticker} />
                <PriceChart
                    key={stock?.ticker + ' price change'}
                    id={stock?.ticker + ' price chart'}
                    legendDisplay={false}
                    xDisplay={false}
                    yDisplay={false}
                    initialPrice={stock?.price}
                    ticker={stock?.ticker}
                    styleSet={'h-3/4 w-2/3 p-5'}
                />
            </div>
        </div>
    );
}

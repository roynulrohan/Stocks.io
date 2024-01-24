import { useEffect, useRef, useState } from 'react';
import { BUY_STOCK, SELL_STOCK } from '../graphql';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_BALANCE, UPDATE_STOCK } from '../redux/actions';
import { Switch } from '@headlessui/react';
import { useMutation } from '@apollo/client';
import checkIcon from '../assets/icons/checked.png';
import { AuthState } from '../types';

interface Props {
    id: string;
    isHidden: boolean;
    toggle: any;
    ticker: string | undefined;
    exchange: string | undefined;
    currentPrice: number;
    sharesOwned: number | undefined;
}

export default function TransactionModal({ id, isHidden, toggle, ticker, exchange, currentPrice, sharesOwned }: Props) {
    const dispatch = useDispatch();
    const currentBalance = useSelector((state: AuthState) => state.authReducer?.authData?.user?.balance);
    const [buyStockMutation] = useMutation(BUY_STOCK);
    const [sellStockMutation] = useMutation(SELL_STOCK);
    const [isSelling, setIsSelling] = useState(false);
    const [shares, setShares] = useState(0);
    const [total, setTotal] = useState(0);
    const [errors, setErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [completionDetails, setCompletionDetails] = useState('');
    const incrementTimer = useRef<any>(null);

    useEffect(() => {
        setTotal((shares || 0) * currentPrice);
    }, [currentPrice, shares]);

    const holdIncrementShares = () => {
        incrementTimer.current = setInterval(() => setShares((prev) => prev + 1), 150);
    };

    const holdDecrementShares = () => {
        if (shares !== 0) {
            incrementTimer.current = setInterval(
                () =>
                    setShares((prev) => {
                        return prev > 0 ? prev - 1 : prev;
                    }),
                50
            );
        }
    };

    const clearIncrementTimer = () => {
        clearInterval(incrementTimer.current);
    };

    const closeModal = () => {
        setIsSelling(false);
        setShares(0);
        setTotal(0);
        setIsLoading(false);
        setIsComplete(false);
        setCompletionDetails('');
        toggle();
    };

    const completeTransaction = () => {
        setIsComplete(true);
        setCompletionDetails(
            (isSelling ? 'Sold' : 'Bought') +
                ' ' +
                shares +
                ' shares of ' +
                ticker +
                ' at ' +
                new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                }).format(total)
        );
    };

    const handleSubmit = () => {
        setErrors('');
        setIsLoading(true);

        if (shares > 0 && ticker) {
            if (isSelling) {
                sellStockMutation({ variables: { ticker, shares } })
                    .then(({ data }) => {
                        setTimeout(() => {
                            setErrors('');
                            dispatch({ type: UPDATE_STOCK, payload: { ticker, stock: data?.sellStock.ownedStock } });
                            dispatch({ type: UPDATE_BALANCE, payload: { newBalance: data?.sellStock.newBalance } });
                            setIsLoading(false);
                            completeTransaction();
                        }, 1500);
                    })
                    .catch((err) => {
                        setErrors(err?.message);
                        setIsLoading(false);
                    });
            } else {
                buyStockMutation({ variables: { ticker, shares } })
                    .then(({ data }) => {
                        setTimeout(() => {
                            setErrors('');
                            dispatch({ type: UPDATE_STOCK, payload: { ticker, stock: data?.buyStock.ownedStock } });
                            dispatch({ type: UPDATE_BALANCE, payload: { newBalance: data?.buyStock.newBalance } });
                            setIsLoading(false);
                            completeTransaction();
                        }, 1500);
                    })
                    .catch((err) => {
                        setErrors(err?.message);
                        setIsLoading(false);
                    });
            }
        } else {
            setErrors('There was an unexpected error');
            setIsLoading(false);
        }
    };

    return (
        <div
            id={id}
            hidden={isHidden}
            className='overflow-y-auto overflow-x-hidden bg-gray-400 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-40 fixed z-50 justify-center items-center h-modal md:h-full md:inset-0'>
            <div className='relative px-4 flex flex-col justify-center mx-auto w-full max-w-lg h-full'>
                <div className='relative bg-white rounded-lg shadow-xl mb-16 dark:bg-darkField'>
                    <div className='flex justify-center items-center p-3 absolute w-full'>
                        <p className='mx-auto text-gray-700 dark:text-gray-200 h-fit'>
                            Balance:&nbsp;
                            <span className='font-bold dark:text-green-400 text-green-500 flex-grow'>
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                }).format(currentBalance)}
                            </span>
                        </p>
                        <button
                            type='button'
                            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
                            onClick={closeModal}>
                            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    fillRule='evenodd'
                                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                    clipRule='evenodd'></path>
                            </svg>
                        </button>
                    </div>
                    {isComplete ? (
                        <div className='h-full p-5 py-16'>
                            <div className='flex justify-center item-center pb-10'>
                                <img src={checkIcon} className='object-contain h-full w-12' alt='completed icon' />
                            </div>
                            <h5 className='text-gray-900 dark:text-gray-200 text-md text-center'>{completionDetails}</h5>
                        </div>
                    ) : (
                        <>
                            <form
                                className='px-6 pb-4 mt-14 space-y-5 lg:px-8 sm:pb-6 xl:pb-8'
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}>
                                <h3 className='font-medium text-gray-900 dark:text-white flex justify-between items-center'>
                                    <span className='text-md'>{ticker + ' - ' + exchange}</span>
                                    {sharesOwned && <span className='font-light text-md'>{sharesOwned} shares owned</span>}
                                </h3>
                                <div>
                                    <label className='flex relative items-center select-none'>
                                        <span className='text-sm font-medium text-gray-900 dark:text-gray-200 mr-3'>Shares </span>

                                        <div className='relative w-2/4 flex items-center select-none'>
                                            <span
                                                onClick={() => {
                                                    if (shares < 0) {
                                                        setShares((shares) => shares - 1);
                                                    }
                                                }}
                                                onMouseDown={() => {
                                                    if (shares >= 0) {
                                                        holdDecrementShares();
                                                    }
                                                }}
                                                onMouseUp={clearIncrementTimer}
                                                onMouseLeave={clearIncrementTimer}
                                                className='absolute h-full bg-gray-200 dark:bg-darkCard flex justify-center items-center text-gray-900 dark:text-gray-200 rounded-l-2xl px-5 w-5 left-0 select-none cursor-pointer'>
                                                -
                                            </span>
                                            <input
                                                type='number'
                                                value={shares.toString()}
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        const parsed = parseInt(e.target.value, 10);
                                                        setShares(parsed);
                                                    } else {
                                                        setShares(0);
                                                    }
                                                }}
                                                name='shares'
                                                id='shares'
                                                min={0}
                                                className='h-8 w-full mx-10 border-none outline-none bg-gray-100 dark:bg-darkCard text-gray-900 dark:text-gray-200 p-2 text-center sm:text-sm'
                                                placeholder='0'
                                            />
                                            <span
                                                onClick={() => {
                                                    setShares((shares) => shares + 1);
                                                }}
                                                onMouseDown={() => {
                                                    holdIncrementShares();
                                                }}
                                                onMouseUp={clearIncrementTimer}
                                                onMouseLeave={clearIncrementTimer}
                                                className='absolute h-full bg-gray-200 dark:bg-darkCard flex justify-center items-center text-gray-900 dark:text-gray-200 rounded-r-2xl px-5 w-5 right-0 select-none cursor-pointer'>
                                                +
                                            </span>
                                        </div>
                                        <span className='text-sm text-gray-900 dark:text-gray-200 whitespace-nowrap ml-3'>
                                            x &nbsp;
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                                maximumFractionDigits: 2,
                                                minimumFractionDigits: 2,
                                            }).format(currentPrice)}
                                        </span>
                                    </label>
                                </div>
                                <div>
                                    <label className='flex relative items-center select-none'>
                                        <span className='text-sm font-medium text-gray-900 dark:text-gray-200 mr-3'>Total </span>
                                        <span className='text-sm rounded-2xl px-5 p-2 text-gray-900 bg-gray-100 dark:bg-darkCard dark:text-gray-200 ml-3'>
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                                maximumFractionDigits: 2,
                                                minimumFractionDigits: 2,
                                            }).format(total)}
                                        </span>
                                        {sharesOwned && isSelling && (
                                            <span
                                                onClick={() => {
                                                    setShares(sharesOwned);
                                                }}
                                                className='text-sm rounded-2xl px-5 p-2 cursor-pointer text-gray-900 bg-orange-200 hover:bg-orange-300 dark:bg-orange-600 hover:dark:bg-orange-700 dark:text-gray-200 ml-3'>
                                                Max
                                            </span>
                                        )}
                                    </label>
                                </div>
                                <div>
                                    <label className='flex relative items-center select-none mb-7'>
                                        <span className='text-sm font-medium text-gray-900 dark:text-gray-200 mr-3'>Transaction Type </span>
                                        <Switch checked={isSelling} onChange={() => {}}>
                                            <span
                                                className='rounded-2xl h-8 w-20 flex justify-center dark:bg-darkCard bg-gray-100 cursor-pointer'
                                                onClick={() => {
                                                    setIsSelling((prev) => !prev);
                                                }}>
                                                <span
                                                    className={`flex flex-col justify-center p-2 h-full rounded-full transition duration-300 ease-in-out transform ${
                                                        !isSelling ? 'bg-transparent text-green-500' : 'text-red-500'
                                                    }`}>
                                                    {!isSelling ? 'Buy' : 'Sell'}
                                                </span>
                                            </span>
                                        </Switch>
                                    </label>
                                </div>
                                {/* <div className='flex justify-between'>
                            <div className='flex items-start'>
                                <div className='flex items-center ml-1 mb-2 select-none'>
                                    <input
                                        id='terms-and-conditions'
                                        aria-describedby='checkbox-1'
                                        type='checkbox'
                                        className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                    />
                                    <label className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                        I agree to the <span className='text-blue-600 hover:underline dark:text-blue-500'>terms and conditions</span>
                                    </label>
                                </div>
                            </div>
                        </div> */}
                                {errors && (
                                    <div className='flex justify-center'>
                                        <div className='flex items-center ml-1 mb-2 select-none'>
                                            <label className='text-xs text-red-600 dark:text-red-500'>{errors}</label>
                                        </div>
                                    </div>
                                )}
                                <button className='w-full flex justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                                    {isLoading && !errors && (
                                        <svg
                                            className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'>
                                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                            <path
                                                className='opacity-75'
                                                fill='currentColor'
                                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                        </svg>
                                    )}
                                    Confirm
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

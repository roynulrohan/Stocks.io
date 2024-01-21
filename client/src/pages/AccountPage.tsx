import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthState } from '../types';
import { GET_TRANSACTIONS, DEPOSIT, WITHDRAW, CHANGE_USERNAME } from '../graphql';
import { UPDATE_BALANCE, UPDATE_USERNAME } from '../redux/actions';
import { Tab } from '@headlessui/react';
import { useQuery, useMutation } from '@apollo/client';
import { Transaction } from '../__generated__/graphql';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const transferOptions = [500, 1000, 10000];

const AccountPage = () => {
    const { data: transactionsRaw } = useQuery(GET_TRANSACTIONS);
    const transactions: Transaction[] = useMemo(() => transactionsRaw?.transactions || [], [transactionsRaw]);
    const auth = useSelector((state: AuthState) => state.authReducer.authData);
    const dispatch = useDispatch();
    const [depositMutation] = useMutation(DEPOSIT);
    const [withdrawMutation] = useMutation(WITHDRAW);
    const [changeUsernameMutation] = useMutation(CHANGE_USERNAME);
    const [errors, setErrors] = useState('');
    const [transferAmount, setTransferAmount] = useState<number>(0);
    const [isLoadingDeposit, setIsLoadingDeposit] = useState(false);
    const [isLoadingWithDraw, setIsLoadingWithdraw] = useState(false);
    const [newUsername, setNewUsername] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoadingUsername, setIsloadingUsername] = useState(false);

    useEffect(() => {
        if (auth) {
            document.title = auth?.user?.username + ' | Stocks.io';
        }
    }, [auth]);

    const handleDeposit = () => {
        if (transferAmount > 0) {
            setErrors('');
            setIsLoadingDeposit(true);

            depositMutation({ variables: { amount: transferAmount } })
                .then(({ data }: any) => {
                    setTimeout(() => {
                        setErrors('');
                        dispatch({ type: UPDATE_BALANCE, payload: { newBalance: data?.deposit.newBalance } });
                        setIsLoadingDeposit(false);
                        setTransferAmount(0);
                    }, 1500);
                })
                .catch((err) => {
                    setErrors(err?.message);
                    setTransferAmount(0);
                    setIsLoadingWithdraw(false);
                });
        }
    };

    const handleWithdraw = () => {
        if (transferAmount > 0) {
            setErrors('');
            setIsLoadingWithdraw(true);

            withdrawMutation({ variables: { amount: transferAmount } })
                .then(({ data }) => {
                    setTimeout(() => {
                        setErrors('');
                        dispatch({ type: UPDATE_BALANCE, payload: { newBalance: data?.withdraw?.newBalance } });
                        setIsLoadingWithdraw(false);
                        setTransferAmount(0);
                    }, 1500);
                })
                .catch((err) => {
                    setErrors(err?.message);
                    setTransferAmount(0);
                    setIsLoadingWithdraw(false);
                });
        }
    };

    const handleUsernameChange = () => {
        setErrors('');
        setIsloadingUsername(true);

        changeUsernameMutation({ variables: { newUsername, confirmPassword } })
            .then(({ data }) => {
                setTimeout(() => {
                    setErrors('');
                    dispatch({ type: UPDATE_USERNAME, payload: { newUsername: data?.changeUsername.newUsername } });
                    setIsloadingUsername(false);
                    setConfirmPassword('');
                    setNewUsername('');
                }, 1500);
            })
            .catch((err) => {
                setErrors(err?.message);
                setIsloadingUsername(false);
            });
    };

    return (
        <>
            {auth && (
                <div className='dark:bg-darkBg flex flex-col min-h-screen items-center justify-center overflow-hidden'>
                    <div className='container flex flex-col md:items-center text-gray-900 dark:text-white'>
                        <h1 className='title-font text-center sm:text-2xl text-xl mb-8 font-medium'>My Account</h1>
                        <div className='md:flex justify-center items-start h-full md:w-3/4 md:h-3/4'>
                            <Tab.Group vertical>
                                <Tab.List className='flex md:flex-col space-x-1 space-y-1 mb-5 md:mb-0 md:mt-5 mr-5'>
                                    <Tab
                                        key={'Profile'}
                                        className={({ selected }) =>
                                            classNames(
                                                selected
                                                    ? 'dark:bg-darkField dark:text-white bg-gray-100'
                                                    : 'dark:text-gray-300 dark:hover:bg-darkField dark:hover:text-white hover:bg-gray-100',
                                                'text-black px-5 py-2 text-md text-center rounded-2xl flex items-center'
                                            )
                                        }>
                                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                                            />
                                        </svg>
                                        Account
                                    </Tab>
                                    <Tab
                                        key={'Transactions'}
                                        className={({ selected }) =>
                                            classNames(
                                                selected
                                                    ? 'dark:bg-darkField dark:text-white bg-gray-100'
                                                    : 'dark:text-gray-300 dark:hover:bg-darkField dark:hover:text-white hover:bg-gray-100',
                                                'text-black px-5 py-2 text-md text-center rounded-2xl flex items-center'
                                            )
                                        }>
                                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
                                            />
                                        </svg>
                                        Transactions
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels className='dark:bg-darkField bg-gray-100 rounded-2xl dark:text-white p-3 min-h-panel w-full'>
                                    <Tab.Panel key={'Profile'} className={classNames('min-h-panel')}>
                                        <div className='flex flex-col justify-center p-5'>
                                            <section className='mx-auto pb-7 divide divide-y w-full flex-1'>
                                                <h2 className='text-lg font-semibold text-gray-700 capitalize dark:text-gray-200'>Balance</h2>
                                                <div className='h-full pt-3'>
                                                    <div className='flex flex-col h-full space-y-4 justify-evenly item-center'>
                                                        <div className='flex justify-between'>
                                                            <div>
                                                                <h3 className='text-gray-700 dark:text-gray-200'>
                                                                    Current Balance:&nbsp;
                                                                    <span className='font-bold dark:text-green-400 text-green-500'>
                                                                        {new Intl.NumberFormat('en-US', {
                                                                            style: 'currency',
                                                                            currency: 'USD',
                                                                            maximumFractionDigits: 2,
                                                                            minimumFractionDigits: 2,
                                                                        }).format(auth ? auth?.user?.balance : 0)}
                                                                    </span>
                                                                </h3>

                                                                <div className='relative mt-4'>
                                                                    <span className='absolute w-11 text-center h-full px-4 py-2 border rounded-md rounded-r-none border-gray-300 dark:border-gray-600 dark:bg-gray-800 bg-white'>
                                                                        $
                                                                    </span>
                                                                    <input
                                                                        required
                                                                        id='transferAmount'
                                                                        type='number'
                                                                        name='transferAmount'
                                                                        min={0}
                                                                        value={transferAmount}
                                                                        onChange={(e) => {
                                                                            setTransferAmount(parseFloat(e.target.value));
                                                                        }}
                                                                        placeholder='Enter amount'
                                                                        className='block pl-14 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                                                                <label className='text-gray-700 dark:text-gray-200' htmlFor='payment-method'>
                                                                    Payment Method
                                                                </label>
                                                                <div className='relative mt-4'>
                                                                    <select
                                                                        className='block appearance-none w-full h-full text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 py-3 px-4 pr-8 leading-tight focus:outline-none'
                                                                        id='payment-method'>
                                                                        <option>VISA **** 1021</option>
                                                                        <option>SAVINGS **** 1002</option>
                                                                    </select>
                                                                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                                                                        <svg
                                                                            className='fill-current h-4 w-4'
                                                                            xmlns='http://www.w3.org/2000/svg'
                                                                            viewBox='0 0 20 20'>
                                                                            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h5 className='text-center text-sm font-light'>Enter amount or select</h5>
                                                        <div className='flex justify-center items-center space-x-1 md:space-x-5'>
                                                            {transferOptions.map((option, i) => {
                                                                return (
                                                                    <button
                                                                        key={i}
                                                                        onClick={() => {
                                                                            setTransferAmount(option);
                                                                        }}
                                                                        className='flex items-center max-h-16 text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-darkCard border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-gray-300 rounded-2xl whitespace-nowrap'>
                                                                        {new Intl.NumberFormat('en-US', {
                                                                            style: 'currency',
                                                                            currency: 'USD',
                                                                            maximumFractionDigits: 0,
                                                                            minimumFractionDigits: 0,
                                                                        }).format(option)}
                                                                    </button>
                                                                );
                                                            })}
                                                            {auth?.user?.balance > 0 && (
                                                                <button
                                                                    onClick={() => {
                                                                        setTransferAmount(auth?.user?.balance);
                                                                    }}
                                                                    className='flex items-center max-h-16 text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-darkCard border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-gray-300 rounded-2xl whitespace-nowrap'>
                                                                    {new Intl.NumberFormat('en-US', {
                                                                        style: 'currency',
                                                                        currency: 'USD',
                                                                        maximumFractionDigits: 2,
                                                                        minimumFractionDigits: 2,
                                                                    }).format(auth?.user?.balance)}
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div className='flex space-x-5 pt-5'>
                                                            <button
                                                                onClick={handleDeposit}
                                                                disabled={isLoadingWithDraw || isLoadingDeposit}
                                                                className='w-full flex justify-center px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-500 focus:outline-none focus:bg-green-600'>
                                                                {isLoadingDeposit && !errors && (
                                                                    <svg
                                                                        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                                                                        xmlns='http://www.w3.org/2000/svg'
                                                                        fill='none'
                                                                        viewBox='0 0 24 24'>
                                                                        <circle
                                                                            className='opacity-25'
                                                                            cx='12'
                                                                            cy='12'
                                                                            r='10'
                                                                            stroke='currentColor'
                                                                            strokeWidth='4'></circle>
                                                                        <path
                                                                            className='opacity-75'
                                                                            fill='currentColor'
                                                                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                                                    </svg>
                                                                )}
                                                                Deposit
                                                            </button>
                                                            <button
                                                                onClick={handleWithdraw}
                                                                disabled={transferAmount > auth?.user?.balance || isLoadingWithDraw || isLoadingDeposit}
                                                                className={classNames(
                                                                    transferAmount > auth?.user?.balance
                                                                        ? 'cursor-not-allowed bg-red-800'
                                                                        : 'hover:bg-red-700 focus:bg-red-700',
                                                                    'w-full flex justify-center px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-red-600 rounded-md focus:outline-none'
                                                                )}>
                                                                {isLoadingWithDraw && !errors && (
                                                                    <svg
                                                                        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                                                                        xmlns='http://www.w3.org/2000/svg'
                                                                        fill='none'
                                                                        viewBox='0 0 24 24'>
                                                                        <circle
                                                                            className='opacity-25'
                                                                            cx='12'
                                                                            cy='12'
                                                                            r='10'
                                                                            stroke='currentColor'
                                                                            strokeWidth='4'></circle>
                                                                        <path
                                                                            className='opacity-75'
                                                                            fill='currentColor'
                                                                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                                                    </svg>
                                                                )}
                                                                Withdraw
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <section className='w-full pb-5 mx-auto divide divide-y'>
                                                <h2 className='text-lg font-semibold text-gray-700 capitalize dark:text-gray-200'>Change Username</h2>
                                                <form
                                                    autoComplete='off'
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                    }}>
                                                    <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                                                        <div>
                                                            <label className='text-gray-700 dark:text-gray-200' htmlFor='newUsername'>
                                                                New Username
                                                            </label>
                                                            <input
                                                                required
                                                                id='newUsername'
                                                                type='text'
                                                                name='newUsername'
                                                                autoComplete='off'
                                                                value={newUsername}
                                                                onChange={(e) => {
                                                                    setNewUsername(e.target.value);
                                                                }}
                                                                placeholder='Enter new username'
                                                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className='text-gray-700 dark:text-gray-200' htmlFor='confirmPassword'>
                                                                Confirm Password
                                                            </label>
                                                            <input
                                                                required
                                                                id='confirmPassword'
                                                                type='password'
                                                                name='confirmPassword'
                                                                value={confirmPassword}
                                                                onChange={(e) => {
                                                                    setConfirmPassword(e.target.value);
                                                                }}
                                                                autoComplete='new-password'
                                                                placeholder='Enter your password'
                                                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='flex mt-6'>
                                                        <button
                                                            type='submit'
                                                            onClick={handleUsernameChange}
                                                            className='w-full flex justify-center px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
                                                            {isLoadingUsername && !errors && (
                                                                <svg
                                                                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    fill='none'
                                                                    viewBox='0 0 24 24'>
                                                                    <circle
                                                                        className='opacity-25'
                                                                        cx='12'
                                                                        cy='12'
                                                                        r='10'
                                                                        stroke='currentColor'
                                                                        strokeWidth='4'></circle>
                                                                    <path
                                                                        className='opacity-75'
                                                                        fill='currentColor'
                                                                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                                                </svg>
                                                            )}
                                                            Update Username
                                                        </button>
                                                    </div>
                                                </form>
                                            </section>
                                            {errors && (
                                                <div className='mt-4 flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800'>
                                                    <div className='flex items-center justify-center w-12 bg-red-700 dark:bg-red-700'>
                                                        <svg className='w-6 h-6 text-white fill-current' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'>
                                                            <path d='M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z' />
                                                        </svg>
                                                    </div>

                                                    <div className='px-4 py-2 -mx-3'>
                                                        <div className='mx-3'>
                                                            <span className='font-semibold text-red-700 dark:text-red-700'>
                                                                <span className='text-sm text-red-700 dark:text-red-700'>{errors}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel key={'Transactions'} className={classNames('h-full overflow-auto')}>
                                        <div className='flex h-full min-w-panel'>
                                            <div className='text-xs overflow-auto h-panel w-full'>
                                                <h2 className='text-left text-lg font-semibold text-gray-700 capitalize dark:text-gray-200 mb-2 px-3 pt-2'>
                                                    Transactions - {transactions && transactions.length} latest records
                                                </h2>
                                                <div className='shadow rounded-lg relative'>
                                                    <table className='leading-normal w-full h-full absolute overflow-hidden'>
                                                        <thead>
                                                            <tr>
                                                                <th
                                                                    scope='col'
                                                                    className='px-5 py-3  border-b border-gray-200 dark:border-gray-800 text-gray-800  dark:text-white text-center text-xs uppercase font-normal'>
                                                                    Type
                                                                </th>
                                                                <th
                                                                    scope='col'
                                                                    className='px-5 py-3  border-b border-gray-200 dark:border-gray-800 text-gray-800  dark:text-white text-center text-xs uppercase font-normal'>
                                                                    Ticker
                                                                </th>
                                                                <th
                                                                    scope='col'
                                                                    className='px-5 py-3  border-b border-gray-200 dark:border-gray-800 text-gray-800  dark:text-white text-center text-xs uppercase font-normal'>
                                                                    Shares
                                                                </th>
                                                                <th
                                                                    scope='col'
                                                                    className='px-5 py-3  border-b border-gray-200 dark:border-gray-800 text-gray-800  dark:text-white text-center text-xs uppercase font-normal'>
                                                                    Amount
                                                                </th>

                                                                <th
                                                                    scope='col'
                                                                    className='px-5 py-3  border-b border-gray-200 dark:border-gray-800 text-gray-800  dark:text-white text-center text-xs uppercase font-normal'>
                                                                    Date
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {transactions.map((transaction, i) => {
                                                                return (
                                                                    <tr key={i} className='bg-white dark:bg-darkCard hover:bg-gray-100 dark:hover:bg-gray-600'>
                                                                        <td className='px-5 py-5 border-b border-gray-200 dark:border-gray-800  text-xs font-medium text-center'>
                                                                            <p className='text-gray-900 dark:text-white whitespace-no-wrap'>
                                                                                {transaction.type}
                                                                            </p>
                                                                        </td>
                                                                        <td className='px-5 py-5 border-b border-gray-200 dark:border-gray-800  text-xs font-medium text-center'>
                                                                            <p className='text-gray-900 dark:text-white whitespace-no-wrap'>
                                                                                {transaction.ticker}
                                                                            </p>
                                                                        </td>
                                                                        <td className='px-5 py-5 border-b border-gray-200 dark:border-gray-800  text-xs font-medium text-center'>
                                                                            <p className='text-gray-900 dark:text-white whitespace-no-wrap'>
                                                                                {transaction.shares} x &nbsp;
                                                                                {new Intl.NumberFormat('en-US', {
                                                                                    style: 'currency',
                                                                                    currency: 'USD',
                                                                                    maximumFractionDigits: 2,
                                                                                    minimumFractionDigits: 2,
                                                                                }).format(transaction.stockPrice)}
                                                                            </p>
                                                                        </td>
                                                                        <td className='px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-xs font-medium text-center'>
                                                                            <p
                                                                                className={
                                                                                    'text-gray-900 whitespace-no-wrap rounded-full p-1' +
                                                                                    (transaction.type === 'SELL' ? ' bg-green-300' : ' bg-red-400')
                                                                                }>
                                                                                {new Intl.NumberFormat('en-US', {
                                                                                    style: 'currency',
                                                                                    currency: 'USD',
                                                                                    maximumFractionDigits: 2,
                                                                                    minimumFractionDigits: 2,
                                                                                }).format(transaction.totalAmount)}
                                                                            </p>
                                                                        </td>

                                                                        <td className='px-5 py-5 border-b border-gray-200 dark:border-gray-800  text-xs font-medium text-center'>
                                                                            <p className='text-gray-900 dark:text-white whitespace-no-wrap'>
                                                                                {new Date(transaction.date).toLocaleTimeString()}
                                                                                {' - '}
                                                                                {new Date(transaction.date).toDateString()}
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccountPage;

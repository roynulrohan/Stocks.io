import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import ToggleDarkMode from './ToggleDarkMode';
import RocketLaunchIcon from '../assets/icons/rocket-launch.png';
import { useSelector, useDispatch } from 'react-redux';
import { AuthState } from '../types';
import { LOGOUT } from '../constants/actions';
import { AnimatePresence, motion } from 'framer-motion';

const navigation = [
    { name: 'Home', redirect: '/', current: true },
    { name: 'Market', redirect: '/market', current: false },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
    const auth = useSelector((state: AuthState) => state.authReducer.authData);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (auth) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [auth]);

    const handleLogin = () => {
        history.push({ pathname: '/auth', state: { redirect: location.pathname } });
    };

    const handleSignOut = () => {
        dispatch({ type: LOGOUT });
        window.location.reload();
    };

    return (
        <div className='flex justify-center w-full'>
            <Disclosure as='nav' className='dark:bg-darkBg w-full fixed bg-white z-50 py-2'>
                {({ open }: any) => (
                    <>
                        <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-3'>
                            <div className='relative flex items-center justify-between'>
                                <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className='inline-flex items-center justify-center transition-all p-2 rounded-md text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                        <span className='sr-only'>Open main menu</span>
                                        {open ? (
                                            <XIcon className='block h-6 w-6' aria-hidden='true' />
                                        ) : (
                                            <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className='flex-1 flex items-center justify-center md:justify-start'>
                                    <div className='flex-shrink-0 flex items-center'>
                                        <div className='h-10 w-10 mr-2 p-1'>
                                            <img src={RocketLaunchIcon} className='object-contain' alt='Stocks.io Logo' />
                                        </div>
                                        <span className='hidden lg:block mx-3 text-xl w-auto dark:text-white select-none'>Stocks.io</span>
                                    </div>
                                    <div className='hidden md:block sm:ml-6'>
                                        <div className='flex space-x-3'>
                                            <AnimatePresence initial={false}>
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.redirect}
                                                        className={classNames(
                                                            location.pathname === item.redirect
                                                                ? 'dark:bg-darkField dark:text-white bg-gray-100'
                                                                : 'dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-100 hover:border-b-2',
                                                            'text-black px-3 py-2 rounded-md text-sm flex items-center'
                                                        )}
                                                        aria-current={location.pathname === item.redirect ? 'page' : undefined}>
                                                        {item.name}
                                                    </Link>
                                                ))}
                                                {isAuthenticated && (
                                                    <>
                                                        <motion.div
                                                            key='Portfolio'
                                                            initial={{ y: -15, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            exit={{ y: -15, opacity: 0 }}
                                                            transition={{ duration: 0.25 }}>
                                                            <Link
                                                                to='/portfolio'
                                                                className={classNames(
                                                                    location.pathname === '/portfolio'
                                                                        ? 'dark:bg-darkField dark:text-white bg-gray-100'
                                                                        : 'dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-100 hover:border-b-2',
                                                                    'text-black px-3 py-2 rounded-md text-sm flex items-center'
                                                                )}
                                                                aria-current={location.pathname === '/portfolio' ? 'page' : undefined}>
                                                                Portfolio
                                                            </Link>
                                                        </motion.div>
                                                        <motion.div
                                                            key='Balance'
                                                            initial={{ y: -15, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            exit={{ y: -15, opacity: 0 }}
                                                            transition={{ duration: 0.25 }}
                                                            className='text-black dark:bg-green-400 bg-green-300 rounded-xl text-sm flex items-center transition-all'>
                                                            <Link to='/account' className='px-3 py-2 '>
                                                                Balance:&nbsp;
                                                                <span className='font-bold'>
                                                                    {new Intl.NumberFormat('en-US', {
                                                                        style: 'currency',
                                                                        currency: 'USD',
                                                                        maximumFractionDigits: 2,
                                                                        minimumFractionDigits: 2,
                                                                    }).format(auth ? auth?.user?.balance : 0)}
                                                                </span>
                                                            </Link>
                                                        </motion.div>
                                                    </>
                                                )}
                                            </AnimatePresence>

                                            <ToggleDarkMode />
                                        </div>
                                    </div>
                                </div>
                                <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
                                    {/* Profile dropdown */}

                                    <Menu as='div' className='ml-3 relative'>
                                        {({ open }: any) => (
                                            <div>
                                                <Menu.Button
                                                    className={classNames(
                                                        isAuthenticated ? 'w-10' : 'w-auto',
                                                        'transition-all h-10 sm:w-auto sm:h-10 text-sm sm:px-4 sm:py-2 sm:justify-around rounded-full lg:w-48 flex justify-center items-center px-3 py-1 font-medium  hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white dark:bg-pink-600 focus-visible:ring-opacity-75 shadow-md'
                                                    )}>
                                                    <span className='hidden sm:block'>{isAuthenticated ? auth?.user?.username : 'Login'}</span>
                                                    <span className='block sm:hidden'>
                                                        {isAuthenticated ? auth?.user?.username.at(0)?.toUpperCase() : 'Login'}
                                                    </span>
                                                    {isAuthenticated &&
                                                        (open ? (
                                                            <ChevronUpIcon className='hidden sm:block h-5' />
                                                        ) : (
                                                            <ChevronDownIcon className='hidden sm:block h-5' />
                                                        ))}

                                                    {!isAuthenticated && <button className='absolute z- w-full h-full' onClick={handleLogin}></button>}
                                                </Menu.Button>

                                                <Transition
                                                    as={Fragment}
                                                    enter='transition ease-out duration-100'
                                                    enterFrom='transform opacity-0 scale-95'
                                                    enterTo='transform opacity-100 scale-100'
                                                    leave='transition ease-in duration-75'
                                                    leaveFrom='transform opacity-100 scale-100'
                                                    leaveTo='transform opacity-0 scale-95'>
                                                    <Menu.Items
                                                        className='origin-top-right absolute right-0 mt-2 w-48 rounded-2xl shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                                                        hidden={!isAuthenticated}>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to='/account'
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block rounded-2xl px-4 py-2 text-sm text-gray-700'
                                                                    )}>
                                                                    Account
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to='/portfolio'
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block rounded-2xl px-4 py-2 text-sm text-gray-700'
                                                                    )}>
                                                                    Portfolio
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <div
                                                                    onClick={handleSignOut}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block rounded-2xl px-4 py-2 text-sm text-red-600 cursor-pointer'
                                                                    )}>
                                                                    Sign out
                                                                </div>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </div>
                                        )}
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <Transition
                            enter='transition duration-200 ease-out'
                            enterFrom='transform scale-95 opacity-0'
                            enterTo='transform scale-100 opacity-100'
                            leave='transition duration-150 ease-out'
                            leaveFrom='transform scale-100 opacity-100'
                            leaveTo='transform scale-95 opacity-0'>
                            <Disclosure.Panel className='md:hidden transition-all duration-150 h-full shadow-md rounded-xl'>
                                <div className='flex flex-col px-2 pt-2 pb-3 space-y-2'>
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.redirect}
                                            className={classNames(
                                                location.pathname === item.redirect
                                                    ? 'dark:bg-darkField dark:text-white'
                                                    : 'dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white hover:border-b-2',
                                                'text-black px-3 py-2 rounded-md text-sm flex items-center transition-all'
                                            )}
                                            aria-current={location.pathname === item.redirect ? 'page' : undefined}>
                                            {item.name}
                                        </Link>
                                    ))}
                                    {isAuthenticated && (
                                        <>
                                            <Link
                                                key='Portfolio'
                                                to='/portfolio'
                                                className={classNames(
                                                    location.pathname === '/portfolio'
                                                        ? 'dark:bg-darkField dark:text-white'
                                                        : 'dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white hover:border-b-2',
                                                    'text-black px-3 py-2 rounded-md text-sm flex items-center transition-all'
                                                )}
                                                aria-current={location.pathname === '/portfolio' ? 'page' : undefined}>
                                                Portfolio
                                            </Link>

                                            <Link
                                                key='Balance'
                                                to='/account'
                                                className='text-black dark:bg-green-400 bg-green-300 w-max px-3 py-2 rounded-md text-sm flex items-center transition-all'>
                                                Balance:&nbsp;
                                                <span className='font-bold'>
                                                    {new Intl.NumberFormat('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                        maximumFractionDigits: 2,
                                                        minimumFractionDigits: 2,
                                                    }).format(auth ? auth?.user?.balance : 0)}
                                                </span>
                                            </Link>
                                        </>
                                    )}
                                    <div className='dark:text-gray-300 px-3 py-2 rounded-md text-sm flex items-center transition-all'>
                                        <span className='mr-6'>Theme</span>
                                        <ToggleDarkMode />
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
        </div>
    );
}

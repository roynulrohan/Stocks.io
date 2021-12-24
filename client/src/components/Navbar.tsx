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
    };

    return (
        <Disclosure as='nav' className='dark:bg-darkBg'>
            {({ open }: any) => (
                <>
                    <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
                        <div className='relative flex items-center justify-between h-20'>
                            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                {/* Mobile menu button*/}
                                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                    <span className='sr-only'>Open main menu</span>
                                    {open ? <XIcon className='block h-6 w-6' aria-hidden='true' /> : <MenuIcon className='block h-6 w-6' aria-hidden='true' />}
                                </Disclosure.Button>
                            </div>
                            <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                                <div className='flex-shrink-0 flex items-center'>
                                    <div className='h-10 w-10 mr-2'>
                                        <img src={RocketLaunchIcon} className='object-contain' alt='Stocks.io Logo' />
                                    </div>
                                    <span className='hidden lg:block mx-3 text-xl w-auto dark:text-white select-none'>Stocks.io</span>
                                </div>
                                <div className='hidden sm:block sm:ml-6'>
                                    <div className='flex space-x-4'>
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.redirect}
                                                className={classNames(
                                                    location.pathname === item.redirect
                                                        ? 'dark:bg-darkField dark:text-white shadow-md'
                                                        : 'dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white hover:border-b-2',
                                                    'text-black px-3 py-2 rounded-md text-sm flex items-center hover:shadow-md'
                                                )}
                                                aria-current={location.pathname === item.redirect ? 'page' : undefined}>
                                                {item.name}
                                            </Link>
                                        ))}
                                        <div className='px-3 flex items-center'>
                                            <ToggleDarkMode />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                {/* Profile dropdown */}
                                {isAuthenticated ? (
                                    <Menu as='div' className='ml-3 relative'>
                                        {({ open }: any) => (
                                            <div>
                                                <Menu.Button
                                                    className='w-10 h-10 sm:w-auto sm:h-10 sm:text-sm sm:px-4 sm:py-2 sm:justify-around 
                                                rounded-full lg:w-48 flex justify-center items-center px-3 py-1 text-lg font-medium   
                                                hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white dark:bg-pink-600 focus-visible:ring-opacity-75 shadow-md'>
                                                    <span className='hidden sm:block'>{auth?.user?.username}</span>
                                                    <span className='block sm:hidden'>{auth?.user?.username.at(0)?.toUpperCase()}</span>
                                                    {open ? (
                                                        <ChevronUpIcon className='hidden sm:block h-5' />
                                                    ) : (
                                                        <ChevronDownIcon className='hidden sm:block h-5' />
                                                    )}
                                                </Menu.Button>
                                                <Transition
                                                    as={Fragment}
                                                    enter='transition ease-out duration-100'
                                                    enterFrom='transform opacity-0 scale-95'
                                                    enterTo='transform opacity-100 scale-100'
                                                    leave='transition ease-in duration-75'
                                                    leaveFrom='transform opacity-100 scale-100'
                                                    leaveTo='transform opacity-0 scale-95'>
                                                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-2xl shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to='/profile'
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block rounded-2xl px-4 py-2 text-sm text-gray-700'
                                                                    )}>
                                                                    Your Profile
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to='/settings'
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block rounded-2xl px-4 py-2 text-sm text-gray-700'
                                                                    )}>
                                                                    Settings
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
                                ) : (
                                    <button
                                        onClick={handleLogin}
                                        className='w-auto px-6 py-2 shadow-md cursor-pointer text-sm font-medium dark:text-white dark:bg-pink-600 rounded-full hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                                        Login
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className='sm:hidden'>
                        <div className='flex flex-col px-2 pt-2 pb-3 space-y-1'>
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.redirect}
                                    className={classNames(
                                        location.pathname === item.redirect
                                            ? 'dark:bg-gray-800 dark:text-white shadow-md'
                                            : 'dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white hover:border-b-2',
                                        'text-black px-3 py-2 rounded-md text-sm flex items-center hover:shadow-md'
                                    )}
                                    aria-current={location.pathname === item.redirect ? 'page' : undefined}>
                                    {item.name}
                                </Link>
                            ))}
                            <div className='px-2 py-2 flex items-center'>
                                <ToggleDarkMode />
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

/* 
    Toggle switch for dark mode
*/

import { useDarkMode } from '../hooks/useDarkMode';
import { Switch } from '@headlessui/react';

export default function ToggleDarkMode() {
    const [isDark, setIsDark] = useDarkMode();

    return (
        <Switch className={'group'} checked={isDark} onChange={setIsDark}>
            <span className={(isDark ? 'bg-gray-700 hover:text-gray-100' : ' bg-gray-100 ') + ' rounded-full shadow-md p-1 h-8 w-16 flex'}>
                <span
                    className={`block h-full w-1/2 rounded-full transition duration-300 ease-in-out transform ${
                        isDark ? 'bg-transparent text-inherit  translate-x-full' : 'text-yellow-500 group-hover:rotate-180'
                    }`}>
                    {isDark ? (
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-full w-full' viewBox='0 0 20 20' fill='currentColor'>
                            <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
                        </svg>
                    ) : (
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-full w-full' viewBox='0 0 20 20' fill='currentColor'>
                            <path
                                fillRule='evenodd'
                                d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                                clipRule='evenodd'
                            />
                        </svg>
                    )}
                </span>
            </span>
        </Switch>
    );
}

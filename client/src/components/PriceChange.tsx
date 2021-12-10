import { useEffect, useState } from 'react';

export default function PriceChange({ price, prevPrice, currency }: any) {
    const [currencySymbol, setCurrencySymbol] = useState('$');
    const [isCAD, setIsCAD] = useState(false);
    const [priceChange, setPriceChange] = useState(0);
    const [isGain, setIsGain] = useState(true);

    useEffect(() => {
        if (price) {
            if (price >= prevPrice) {
                setIsGain(true);
                const change = ((price - prevPrice) / price) * 100;
                setPriceChange(change);
            } else {
                setIsGain(false);
                const change = ((prevPrice - price) / prevPrice) * 100;
                setPriceChange(change);
            }
        }
    }, [price]);

    useEffect(() => {
        if (currency === 'USD') {
            setCurrencySymbol('$');
        } else if (currency === 'EUR') {
            setCurrencySymbol('€');
        } else if (currency === 'CAD') {
            setIsCAD(true);
        }
    }, []);

    return (
        <p
            className={
                'text-md sm:text-xs lg:text-md text-gray-900 dark:text-gray-200 mb-2 rounded-full px-2 py-1' +
                (isGain ? ' dark:bg-green-600 bg-green-300' : ' dark:bg-red-800 bg-red-400')
            }>
            <span className='font-semibold'>
                {currencySymbol}
                {parseFloat(price)?.toFixed(2)}
            </span>{' '}
            <span className='dark:text-gray-300 font-medium text-xs'>
                {isCAD && <span>CAD</span>} {isGain ? ' +' + priceChange.toFixed(2) : ' -' + priceChange.toFixed(2)}%
            </span>
        </p>
    );
}

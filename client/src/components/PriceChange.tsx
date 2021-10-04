import { useEffect, useState } from 'react';

export default function PriceChange({ price, currency }: any) {
    const [currencySymbol, setCurrencySymbol] = useState('$');
    const [isCAD, setIsCAD] = useState(false);

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
        <p className='text-xl text-gray-900 dark:text-gray-300 mb-2'>
            {currencySymbol}
            {price} {isCAD && <span>CAD</span>}
        </p>
    );
}

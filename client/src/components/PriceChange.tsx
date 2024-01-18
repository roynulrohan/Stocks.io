import React, { useEffect, useState } from 'react';

interface Props {
    currentPrice: number;
    prevPrice: number;
    currency: string;
    ticker: string;
    styleset: string;
}

const PriceChange = React.memo(({ currentPrice, prevPrice, currency, ticker, styleset }: Props) => {
    const [currencySymbol, setCurrencySymbol] = useState('$');
    const [isCAD, setIsCAD] = useState(false);
    const [priceChange, setPriceChange] = useState<number>(0);
    const [isGain, setIsGain] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (ticker !== '') {
            const sessionData = JSON.parse(window.sessionStorage.getItem(ticker + '-PriceChange') || '{}');

            if (sessionData.priceChange) {
                setIsGain(sessionData?.isGain);
                setPriceChange(sessionData?.priceChange);
            }
        }

        setMounted(true);
    }, []);

    useEffect(() => {
        if (ticker !== '') {
            if (mounted) {
                calculateChange();
            }
        } else {
            calculateChange();
        }
    }, [currentPrice]);

    useEffect(() => {
        if (ticker !== '') {
            window.sessionStorage.setItem(ticker + '-PriceChange', JSON.stringify({ isGain, priceChange }));
        }
    }, [priceChange]);

    useEffect(() => {
        if (currency === 'USD') {
            setCurrencySymbol('$');
        } else if (currency === 'EUR') {
            setCurrencySymbol('€');
        } else if (currency === 'CAD') {
            setIsCAD(true);
        }
    }, [currency]);

    const calculateChange = () => {
        if (currentPrice >= prevPrice) {
            setIsGain(true);
            const change = ((currentPrice - prevPrice) / currentPrice) * 100;
            setPriceChange(change);
        } else {
            setIsGain(false);
            const change = ((prevPrice - currentPrice) / prevPrice) * 100;
            setPriceChange(change);
        }
    };

    return (
        <p className={'text-gray-900 rounded-full h-fit px-2 py-1 whitespace-nowrap ' + styleset + (isGain ? ' bg-green-300' : ' bg-red-400')}>
            <span className='font-semibold'>
                {currencySymbol}
                {currentPrice.toFixed(2)}
            </span>{' '}
            <span className='font-medium'>
                {isCAD && <span>CAD</span>} {isGain ? ' +' + priceChange?.toFixed(2) : ' -' + priceChange?.toFixed(2)}%
            </span>
        </p>
    );
});

export default PriceChange;

import React, { useEffect, useMemo, useRef } from 'react';

interface Props {
    currentPrice: number;
    prevPrice: number;
    currency: string;
    ticker: string;
    styleset: string;
}

const calculateChange = (a: number, b: number) => {
    const percentageChange = ((b - a) / Math.abs(a)) * 100;
    const roundedChange = Number(percentageChange.toFixed(2));

    return roundedChange;
};

const PriceChange = React.memo(({ currentPrice, prevPrice, currency, ticker, styleset }: Props) => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const priceChange = useMemo(() => {
        if (!isMounted.current) {
            const sessionData = JSON.parse(window.sessionStorage.getItem(ticker + '-PriceChange') || '{}');

            if (sessionData.priceChange) {
                return sessionData?.priceChange;
            }
        }
        return calculateChange(prevPrice, currentPrice);
    }, [currentPrice, prevPrice, ticker]);

    const isGain = useMemo(() => priceChange > 0, [priceChange]);

    useEffect(() => {
        if (ticker !== '') {
            window.sessionStorage.setItem(ticker + '-PriceChange', JSON.stringify({ isGain, priceChange }));
        }
    }, [priceChange, isGain, ticker]);

    return (
        <p className={'text-gray-900 rounded-full h-fit px-2 py-1 whitespace-nowrap ' + styleset + (isGain ? ' bg-green-300' : ' bg-red-400')}>
            <span className='font-semibold'>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency,
                }).format(currentPrice)}
            </span>{'  '}
            <span className='font-medium text-xs'>{priceChange?.toFixed(2)}%</span>
        </p>
    );
});

export default PriceChange;

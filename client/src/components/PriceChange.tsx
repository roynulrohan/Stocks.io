import React, { useEffect, useMemo, useRef } from 'react';
import { cn } from '../utils/cn';

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
    currentPrice: number;
    prevPrice: number;
    currency: string;
    ticker: string;
    hideChange?: boolean;
}

const calculateChange = (a: number, b: number) => {
    const percentageChange = ((b - a) / Math.abs(a)) * 100;
    const roundedChange = Number(percentageChange.toFixed(2));

    return roundedChange;
};

const PriceChange = React.memo(({ currentPrice, prevPrice, currency, hideChange = false, id, className }: Props) => {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const priceChange = useMemo(() => {
        if (!isMounted.current && id) {
            const sessionData = JSON.parse(window.sessionStorage.getItem(id) || '{}');

            if (sessionData.priceChange) {
                return sessionData?.priceChange;
            }
        }
        return calculateChange(prevPrice, currentPrice);
    }, [currentPrice, prevPrice, id]);

    const isGain = useMemo(() => priceChange > 0, [priceChange]);

    useEffect(() => {
        if (id) {
            window.sessionStorage.setItem(id, JSON.stringify({ isGain, priceChange }));
        }
    }, [priceChange, isGain, id]);

    return (
        <p
            className={cn(
                'text-gray-900 rounded-full h-fit px-2 py-1 whitespace-nowrap ',
                className,
                isGain ? ' bg-green-300' : ' bg-red-400',
                priceChange === 0 && 'bg-gray-100'
            )}>
            <span className='font-semibold'>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency,
                }).format(currentPrice)}
            </span>
            {!hideChange && (
                <span className='font-medium text-xs'>
                    {'  '}
                    {isGain && '+'}
                    {priceChange?.toFixed(2)}%
                </span>
            )}
        </p>
    );
});

export default PriceChange;

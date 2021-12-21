import { useEffect, useState } from 'react';
import { useSocket } from '../contexts/SocketProvider';
import { StockUpdate } from '../types';

interface Props {
    initialPrice: number;
    currency: string;
    ticker: string;
}

export default function PriceChange({ initialPrice, currency, ticker }: Props) {
    const socket: any = useSocket();
    const [currencySymbol, setCurrencySymbol] = useState('$');
    const [isCAD, setIsCAD] = useState(false);
    const [priceChange, setPriceChange] = useState<number>(0);
    const [isGain, setIsGain] = useState(true);
    const [price, setPrice] = useState<number>(initialPrice || 0);
    const [prevPrice, setPrevPrice] = useState<number>(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const sessionData = JSON.parse(window.sessionStorage.getItem(ticker + '-PriceChange') || '{}');
        
        setIsGain(sessionData?.isGain);
        setPriceChange(sessionData?.priceChange);

        setMounted(true);
    }, []);

    useEffect(() => {
        if (socket === null) return;

        socket?.on(ticker, (priceData: StockUpdate) => {
            setPrice(priceData.price);
        });

        return () => {
            socket && socket?.off(ticker);
        };
    }, [socket, ticker]);

    useEffect(() => {
        if (mounted) {
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

        setPrevPrice(price);
    }, [price]);

    useEffect(() => {
        window.sessionStorage.setItem(ticker + '-PriceChange', JSON.stringify({ isGain, priceChange }));
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

    return (
        <p
            className={
                'text-md sm:text-xs lg:text-md text-gray-900 dark:text-gray-200 mb-2 rounded-full px-2 py-1' +
                (isGain ? ' dark:bg-green-600 bg-green-300' : ' dark:bg-red-800 bg-red-400')
            }>
            <span className='font-semibold'>
                {currencySymbol}
                {price.toFixed(2)}
            </span>{' '}
            <span className='dark:text-gray-300 font-medium text-xs'>
                {isCAD && <span>CAD</span>} {isGain ? ' +' + priceChange.toFixed(2) : ' -' + priceChange.toFixed(2)}%
            </span>
        </p>
    );
}

import { useEffect, useState } from 'react';
import { useSocket } from '../contexts/SocketProvider';

export default function PriceChange({ initialPrice, currency, ticker }: any) {
    const socket: any = useSocket();
    const [currencySymbol, setCurrencySymbol] = useState('$');
    const [isCAD, setIsCAD] = useState(false);
    const [priceChange, setPriceChange] = useState(0);
    const [isGain, setIsGain] = useState(true);

    const [price, setPrice] = useState<any>(0);
    const [prevPrice, setPrevPrice] = useState<number>(0);

    useEffect(() => {
        setPrice(initialPrice || 0);
    }, [initialPrice]);

    useEffect(() => {
        if (socket === null) return;

        socket?.on(ticker, (price: number) => {
            setPrice(price);
        });

        return () => {
            socket && socket?.off(ticker);
        };
    }, [socket, ticker]);

    useEffect(() => {
        setPrevPrice(price);
    }, [price]);

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
    }, [currency]);

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

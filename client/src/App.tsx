import './scss/style.scss';
import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AnimatePresence } from 'framer-motion';
import { useSocket } from './contexts/SocketProvider';
import { useDispatch } from 'react-redux';
import { setStocks } from './actions/actions';
import MarketPage from './pages/MarketPage';

function App() {
    const location = useLocation();
    const socket: any = useSocket();
    const dispatch = useDispatch();

    useEffect(() => {
        if (socket === null) return;

        socket?.on('stock-update', (stocks: []) => {
            dispatch(setStocks(stocks));
        });

        return () => {
            socket && socket?.off('stock-update');
        };
    }, [socket, dispatch]);

    return (
        <AnimatePresence>
            <Navbar />

            <Switch location={location} key={location.pathname}>
                <Route exact path='/'>
                    <div className='dark:bg-gray-800 h-screen'>
                        <h1>Home</h1>
                    </div>
                </Route>
                <Route path='/market'>
                    <MarketPage />
                </Route>
            </Switch>
        </AnimatePresence>
    );
}

export default App;

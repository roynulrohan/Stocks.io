import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLazyQuery } from '@apollo/client';
import { VERIFY_USER, GET_OWNEDSTOCKS } from './graphql';
import { useDispatch } from 'react-redux';
import { AUTH, OWNED_STOCKS } from './redux/actions';

import NotFoundPage from './pages/NotFoundPage';
import MarketPage from './pages/MarketPage';
import StockPage from './pages/StockPage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import PortfolioPage from './pages/PortfolioPage';

function App() {
    const [getOwnedStocks, { data: ownedStocksData, loading: ownedStockLoading }] = useLazyQuery(GET_OWNEDSTOCKS);
    const [verifyUser, { data: userData, loading: userLoading }] = useLazyQuery(VERIFY_USER);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    useEffect(() => {
        if (userData && !userLoading) {
            dispatch({ type: AUTH, payload: userData?.getUser });
        }
    }, [userData, userLoading, dispatch]);

    useEffect(() => {
        getOwnedStocks();
    }, [getOwnedStocks]);

    useEffect(() => {
        if (ownedStocksData && !ownedStockLoading) {
            dispatch({ type: OWNED_STOCKS, payload: ownedStocksData.ownedStocks });
        }
    }, [ownedStocksData, ownedStockLoading, dispatch]);

    return (
        <AnimatePresence>
            <ScrollToTop>
                <Navbar />
                <Routes location={location} key={location.pathname}>
                    <Route index element={<HomePage />} />
                    <Route path='/market' element={<MarketPage />} />
                    <Route path='/auth' element={<AuthPage />} />

                    <Route path='/stock/:ticker' element={<StockPage ticker={useLocation().pathname.replace('/stock/', '')} />} />

                    <Route
                        path='/portfolio'
                        element={
                            <ProtectedRoute>
                                <PortfolioPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/account'
                        element={
                            <ProtectedRoute>
                                <AccountPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
                <Footer />
            </ScrollToTop>
        </AnimatePresence>
    );
}

export default App;

import React, { useEffect } from 'react';
import './scss/style.scss';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLazyQuery } from '@apollo/client';
import { VERIFY_USER, GET_OWNEDSTOCKS } from './graphql';
import { useDispatch } from 'react-redux';
import { AUTH, OWNED_STOCKS } from './constants/actions';

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
            dispatch({ type: OWNED_STOCKS, payload: ownedStocksData?.getOwnedStocks?.ownedStocks });
        }
    }, [ownedStocksData, ownedStockLoading, dispatch]);

    return (
        <AnimatePresence>
            <ScrollToTop>
                <Navbar />
                <Switch location={location} key={location.pathname}>
                    <Route exact path='/' render={() => <HomePage />} />
                    <Route exact path='/market' render={() => <MarketPage />} />
                    <Route exact path='/auth' render={() => <AuthPage />} />

                    <Route exact path='/stock/:ticker'>
                        <StockPage ticker={useLocation().pathname.replace('/stock/', '')} />
                    </Route>

                    <Route exact path='/portfolio' render={() => <NotFoundPage underConstruction />} />
                    <ProtectedRoute exact path='/account' comp={() => <AccountPage />} />

                    <Route render={() => <NotFoundPage />} />
                </Switch>
                <Footer />
            </ScrollToTop>
        </AnimatePresence>
    );
}

export default App;

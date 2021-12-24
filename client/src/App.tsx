import React, { useEffect } from 'react';
import './scss/style.scss';
import { Route, Switch, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { AnimatePresence } from 'framer-motion';
import MarketPage from './pages/MarketPage';
import StockPage from './pages/StockPage';
import AuthPage from './pages/AuthPage';
import { useLazyQuery } from '@apollo/client';
import { VERIFY_USER } from './graphql';
import { useDispatch } from 'react-redux';
import { AUTH } from './constants/actions';

function App() {
    const [verifyUser, { data, loading }] = useLazyQuery(VERIFY_USER);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        verifyUser();
    }, []);

    useEffect(() => {
        if (data && !loading) {
            dispatch({ type: AUTH, payload: data?.getUser });
        }
    }, [data, loading]);

    return (
        <AnimatePresence>
            <div className='min-h-screen flex flex-col'>
                <ScrollToTop>
                    <Navbar />
                    <Switch location={location} key={location.pathname}>
                        <Route exact path='/'>
                            <div className='dark:bg-darkBg h-full w-full min-h-screen'>
                                <h1>Home</h1>
                            </div>
                        </Route>
                        <Route exact path='/market'>
                            <MarketPage />
                        </Route>
                        <Route exact path='/auth'>
                            <AuthPage />
                        </Route>
                        <Route path='/stock'>
                            <StockPage ticker={useLocation().pathname.replace('/stock/', '')} />
                        </Route>
                    </Switch>
                    <Footer />
                </ScrollToTop>
            </div>
        </AnimatePresence>
    );
}

export default App;

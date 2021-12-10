import './scss/style.scss';
import { Route, Switch, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AnimatePresence } from 'framer-motion';
import MarketPage from './pages/MarketPage';

function App() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Navbar />

            <Switch location={location} key={location.pathname}>
                <Route exact path='/'>
                    <div className='dark:bg-darkBg h-full w-full min-h-screen'>
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

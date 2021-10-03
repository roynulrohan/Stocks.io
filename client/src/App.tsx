import './scss/style.scss';
import { Route, Switch, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AnimatePresence } from 'framer-motion';

function App() {
    const location = useLocation();

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
                    <div className='dark:bg-gray-800 h-screen'>
                        <h1>Market</h1>
                    </div>
                </Route>
            </Switch>
        </AnimatePresence>
    );
}

export default App;

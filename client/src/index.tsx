import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider domain={process.env.REACT_APP_DOMAIN || ''} clientId={process.env.REACT_APP_CLIENT_ID || ''} redirectUri={window.location.origin}>
            <Router>
                <App />
            </Router>
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

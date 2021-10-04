import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { SocketProvider } from './contexts/SocketProvider';
import { createStore } from 'redux';
import reducers from './reducers';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

// create redux store
const store = createStore(reducers, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Auth0Provider domain={process.env.REACT_APP_DOMAIN || ''} clientId={process.env.REACT_APP_CLIENT_ID || ''} redirectUri={window.location.origin}>
                <Provider store={store}>
                    <SocketProvider>
                        <Router>
                            <App />
                        </Router>
                    </SocketProvider>
                </Provider>
            </Auth0Provider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

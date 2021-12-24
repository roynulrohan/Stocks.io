import { gql } from '@apollo/client';

export const GET_STOCKS = gql`
    query GETSTOCKS($search: String) {
        getStocks(search: $search) {
            stocks {
                ticker
                name
                price
                exchange
                industry
                logo
                ipo
                country
                currency
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation LoginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            user {
                _id
                balance
                username
            }
            token
        }
    }
`;

export const REGISTER_USER = gql`
    mutation RegisterUser($username: String!, $password: String!, $confirmPassword: String!) {
        registerUser(username: $username, password: $password, confirmPassword: $confirmPassword) {
            user {
                _id
                balance
                username
            }
            token
        }
    }
`;

export const VERIFY_USER = gql`
    query GetUser {
        getUser {
            user {
                _id
                username
                balance
            }
            token
        }
    }
`;

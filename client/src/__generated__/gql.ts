/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query SearchStocks($search: String, $limit: Int, $random: Boolean) {\n        searchStocks(search: $search, limit: $limit, random: $random) {\n            ticker\n            name\n            exchange\n            price\n            logo\n            ipo\n            industry\n            country\n            currency\n            weburl\n        }\n    }\n": types.SearchStocksDocument,
    "\n    query GETSTOCK($ticker: String) {\n        stock(ticker: $ticker) {\n            ticker\n            name\n            exchange\n            price\n            logo\n            ipo\n            industry\n            country\n            currency\n            weburl\n        }\n    }\n": types.GetstockDocument,
    "\n    mutation LoginUser($username: String!, $password: String!) {\n        loginUser(username: $username, password: $password) {\n            user {\n                _id\n                balance\n                username\n            }\n            token\n        }\n    }\n": types.LoginUserDocument,
    "\n    mutation RegisterUser($username: String!, $password: String!, $confirmPassword: String!) {\n        registerUser(username: $username, password: $password, confirmPassword: $confirmPassword) {\n            user {\n                _id\n                balance\n                username\n            }\n            token\n        }\n    }\n": types.RegisterUserDocument,
    "\n    query GetUser {\n        getUser {\n            user {\n                _id\n                username\n                balance\n            }\n            token\n        }\n    }\n": types.GetUserDocument,
    "\n    query GetTransactions {\n        transactions {\n            userId\n            type\n            ticker\n            shares\n            totalAmount\n            stockPrice\n            date\n        }\n    }\n": types.GetTransactionsDocument,
    "\n    mutation Deposit($amount: Float!) {\n        deposit(amount: $amount) {\n            newBalance\n        }\n    }\n": types.DepositDocument,
    "\n    mutation Withdraw($amount: Float!) {\n        withdraw(amount: $amount) {\n            newBalance\n        }\n    }\n": types.WithdrawDocument,
    "\n    mutation ChangeUsername($newUsername: String!, $confirmPassword: String!) {\n        changeUsername(newUsername: $newUsername, confirmPassword: $confirmPassword) {\n            newUsername\n        }\n    }\n": types.ChangeUsernameDocument,
    "\n    query GetOwnedStocks {\n        ownedStocks {\n            _id\n            userId\n            ticker\n            shares\n            initialInvestment\n            name\n            exchange\n            price\n            logo\n            ipo\n            industry\n            country\n            currency\n            weburl\n        }\n    }\n": types.GetOwnedStocksDocument,
    "\n    mutation BuyStock($ticker: String!, $shares: Int!) {\n        buyStock(ticker: $ticker, shares: $shares) {\n            ownedStock {\n                _id\n                userId\n                ticker\n                shares\n                initialInvestment\n            }\n            newBalance\n        }\n    }\n": types.BuyStockDocument,
    "\n    mutation SellStock($ticker: String!, $shares: Int!) {\n        sellStock(ticker: $ticker, shares: $shares) {\n            ownedStock {\n                _id\n                userId\n                ticker\n                shares\n                initialInvestment\n            }\n            newBalance\n        }\n    }\n": types.SellStockDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query SearchStocks($search: String, $limit: Int, $random: Boolean) {\n        searchStocks(search: $search, limit: $limit, random: $random) {\n            ticker\n            name\n            exchange\n            price\n            logo\n            ipo\n            industry\n            country\n            currency\n            weburl\n        }\n    }\n"): (typeof documents)["\n    query SearchStocks($search: String, $limit: Int, $random: Boolean) {\n        searchStocks(search: $search, limit: $limit, random: $random) {\n            ticker\n            name\n            exchange\n            price\n            logo\n            ipo\n            industry\n            country\n            currency\n            weburl\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GETSTOCK($ticker: String) {\n        stock(ticker: $ticker) {\n            ticker\n            name\n            exchange\n            price\n            logo\n            ipo\n            industry\n            country\n            currency\n            weburl\n        }\n    }\n"): (typeof documents)["\n    query GETSTOCK($ticker: String) {\n        stock(ticker: $ticker) {\n            ticker\n            name\n            exchange\n            price\n            logo\n            ipo\n            industry\n            country\n            currency\n            weburl\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation LoginUser($username: String!, $password: String!) {\n        loginUser(username: $username, password: $password) {\n            user {\n                _id\n                balance\n                username\n            }\n            token\n        }\n    }\n"): (typeof documents)["\n    mutation LoginUser($username: String!, $password: String!) {\n        loginUser(username: $username, password: $password) {\n            user {\n                _id\n                balance\n                username\n            }\n            token\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation RegisterUser($username: String!, $password: String!, $confirmPassword: String!) {\n        registerUser(username: $username, password: $password, confirmPassword: $confirmPassword) {\n            user {\n                _id\n                balance\n                username\n            }\n            token\n        }\n    }\n"): (typeof documents)["\n    mutation RegisterUser($username: String!, $password: String!, $confirmPassword: String!) {\n        registerUser(username: $username, password: $password, confirmPassword: $confirmPassword) {\n            user {\n                _id\n                balance\n                username\n            }\n            token\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetUser {\n        getUser {\n            user {\n                _id\n                username\n                balance\n            }\n            token\n        }\n    }\n"): (typeof documents)["\n    query GetUser {\n        getUser {\n            user {\n                _id\n                username\n                balance\n            }\n            token\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetTransactions {\n        transactions {\n            userId\n            type\n            ticker\n            shares\n            totalAmount\n            stockPrice\n            date\n        }\n    }\n"): (typeof documents)["\n    query GetTransactions {\n        transactions {\n            userId\n            type\n            ticker\n            shares\n            totalAmount\n            stockPrice\n            date\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Deposit($amount: Float!) {\n        deposit(amount: $amount) {\n            newBalance\n        }\n    }\n"): (typeof documents)["\n    mutation Deposit($amount: Float!) {\n        deposit(amount: $amount) {\n            newBalance\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Withdraw($amount: Float!) {\n        withdraw(amount: $amount) {\n            newBalance\n        }\n    }\n"): (typeof documents)["\n    mutation Withdraw($amount: Float!) {\n        withdraw(amount: $amount) {\n            newBalance\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation ChangeUsername($newUsername: String!, $confirmPassword: String!) {\n        changeUsername(newUsername: $newUsername, confirmPassword: $confirmPassword) {\n            newUsername\n        }\n    }\n"): (typeof documents)["\n    mutation ChangeUsername($newUsername: String!, $confirmPassword: String!) {\n        changeUsername(newUsername: $newUsername, confirmPassword: $confirmPassword) {\n            newUsername\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetOwnedStocks {\n        ownedStocks {\n            _id\n            userId\n            ticker\n            shares\n            initialInvestment\n            name\n            exchange\n            price\n            logo\n            ipo\n            industry\n            country\n            currency\n            weburl\n        }\n    }\n"): (typeof documents)["\n    query GetOwnedStocks {\n        ownedStocks {\n            _id\n            userId\n            ticker\n            shares\n            initialInvestment\n            name\n            exchange\n            price\n            logo\n            ipo\n            industry\n            country\n            currency\n            weburl\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation BuyStock($ticker: String!, $shares: Int!) {\n        buyStock(ticker: $ticker, shares: $shares) {\n            ownedStock {\n                _id\n                userId\n                ticker\n                shares\n                initialInvestment\n            }\n            newBalance\n        }\n    }\n"): (typeof documents)["\n    mutation BuyStock($ticker: String!, $shares: Int!) {\n        buyStock(ticker: $ticker, shares: $shares) {\n            ownedStock {\n                _id\n                userId\n                ticker\n                shares\n                initialInvestment\n            }\n            newBalance\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation SellStock($ticker: String!, $shares: Int!) {\n        sellStock(ticker: $ticker, shares: $shares) {\n            ownedStock {\n                _id\n                userId\n                ticker\n                shares\n                initialInvestment\n            }\n            newBalance\n        }\n    }\n"): (typeof documents)["\n    mutation SellStock($ticker: String!, $shares: Int!) {\n        sellStock(ticker: $ticker, shares: $shares) {\n            ownedStock {\n                _id\n                userId\n                ticker\n                shares\n                initialInvestment\n            }\n            newBalance\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
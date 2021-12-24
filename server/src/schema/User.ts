import { gql } from 'apollo-server-express';

export const UserTypeDef = gql`
    type User {
        _id: String!
        username: String!
        balance: Float!
    }

    type UserResponse {
        user: User
        token: String
    }

    type Query {
        getUser: UserResponse!
    }

    type Mutation {
        registerUser(username: String!, password: String!, confirmPassword: String!): UserResponse
        loginUser(username: String!, password: String!): UserResponse
    }
`;
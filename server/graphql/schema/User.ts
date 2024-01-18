export const UserTypeDef = `#graphql
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

    type balanceResponse {
        newBalance: Float!
    }

    type usernameChangeResponse {
        newUsername: String!
    }

    type Mutation {
        registerUser(username: String!, password: String!, confirmPassword: String!): UserResponse!
        loginUser(username: String!, password: String!): UserResponse!
        deposit(amount: Float!): balanceResponse!
        withdraw(amount: Float!): balanceResponse!
        changeUsername(newUsername: String!, confirmPassword: String!): usernameChangeResponse!
    }
`;

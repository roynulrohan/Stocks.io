import { User } from '../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validateRegisterInput, validateLoginInput } from '../../utils/AuthValidator';
import { verifyToken } from '../../middleware/auth';
import { GraphQLError } from 'graphql';

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

export const UserResolver = {
    Mutation: {
        registerUser: async (_, { username, password, confirmPassword }) => {
            const { valid, errors } = validateRegisterInput(username, password, confirmPassword);

            if (!valid) {
                throw new GraphQLError(errors, {
                    extensions: {
                        code: 'UNAUTHORIZED',
                    },
                });
            }

            const user = await User.findOne({ username });

            if (user) {
                throw new GraphQLError('Username is already taken', {
                    extensions: {
                        code: 'TAKEN',
                    },
                });
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                password,
            });

            const result = await newUser.save();

            const token = generateToken(result);

            return { user: result, token };
        },
        loginUser: async (_, { username, password }) => {
            const { valid, errors } = validateLoginInput(username, password);

            if (!valid) {
                throw new GraphQLError(errors, {
                    extensions: {
                        code: 'UNAUTHORIZED',
                    },
                });
            }

            const user = await User.findOne({ username });

            if (!user) {
                throw new GraphQLError('Incorrect username or password', {
                    extensions: {
                        code: 'BAD_INPUT',
                    },
                });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                throw new GraphQLError('Incorrect username or password', {
                    extensions: {
                        code: 'BAD_INPUT',
                    },
                });
            }

            const token = generateToken(user);

            return { user, token };
        },
        deposit: async (_, { amount }, context) => {
            const { token } = context;

            const authResult = await verifyToken(token);

            if (authResult.error) {
                throw new GraphQLError(authResult.error, {
                    extensions: {
                        code: 'UNAUTHORIZED',
                    },
                });
            }

            const result = await User.findOneAndUpdate({ _id: authResult.userId }, { $inc: { balance: amount } }, { new: true });

            return { newBalance: result.balance };
        },
        withdraw: async (_, { amount }, context) => {
            const { token } = context;

            const authResult = await verifyToken(token);

            if (authResult.error) {
                throw new GraphQLError(authResult.error, {
                    extensions: {
                        code: 'UNAUTHORIZED',
                    },
                });
            }

            const user = await User.findOne({ _id: authResult.userId });

            if (user.balance < amount) {
                throw new GraphQLError('Insufficient funds', {
                    extensions: {
                        code: 'INSUFFICIENT_FUNDS',
                    },
                });
            }

            const result = await User.findOneAndUpdate({ _id: authResult.userId }, { $inc: { balance: -amount } }, { new: true });

            return { newBalance: result.balance };
        },
        changeUsername: async (_, { newUsername, confirmPassword }, context) => {
            const { token } = context;

            const authResult = await verifyToken(token);

            if (authResult.error) {
                throw new GraphQLError(authResult.error, {
                    extensions: {
                        code: 'UNAUTHORIZED',
                    },
                });
            }

            const nameExists = await User.findOne({ username: newUsername });

            if (nameExists) {
                throw new GraphQLError('Username is already taken', {
                    extensions: {
                        code: 'TAKEN',
                    },
                });
            }

            const user = await User.findOne({ _id: authResult.userId });

            const passResult = await bcrypt.compare(confirmPassword, user.password);

            if (!passResult) {
                throw new GraphQLError('Incorrect password', {
                    extensions: {
                        code: 'BAD_INPUT',
                    },
                });
            }

            const result = await User.findOneAndUpdate({ _id: authResult.userId }, { username: newUsername }, { new: true });

            return { newUsername: result.username };
        },
    },

    Query: {
        getUser: async (_, args, context) => {
            const { token } = context;

            const result = await verifyToken(token);

            if (result.error) {
                throw new GraphQLError(result.error, {
                    extensions: {
                        code: 'UNAUTHORIZED',
                    },
                });
            }

            const user = await User.findOne({ _id: result.userId });

            return { user, token: token.split(' ')[1] };
        },
    },
};

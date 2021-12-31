import { User } from '../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserInputError, AuthenticationError, ApolloError } from 'apollo-server-express';
import { validateRegisterInput, validateLoginInput } from '../../utils/AuthValidator';
import { verifyToken } from '../../middleware/auth';

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
                throw new UserInputError(errors);
            }

            const user = await User.findOne({ username });

            if (user) {
                throw new UserInputError('Username is already taken');
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                password,
            });

            const result: any = await newUser.save();

            const token = generateToken(result);

            return { user: result, token };
        },
        loginUser: async (_, { username, password }) => {
            const { valid, errors } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError(errors);
            }

            const user: any = await User.findOne({ username });

            if (!user) {
                throw new UserInputError('Incorrect username or password');
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                throw new UserInputError('Incorrect username or password');
            }

            const token = generateToken(user);

            return { user, token };
        },
        deposit: async (_, { amount }, context) => {
            const token = context.req.headers.authorization;

            const authResult = verifyToken({ token: token.split(' ')[1] });

            if (authResult.error) {
                throw new AuthenticationError(authResult.error);
            }

            const result: any = await User.findOneAndUpdate({ _id: authResult.userId }, { $inc: { balance: amount } }, { new: true });

            return { newBalance: result.balance };
        },
        withdraw: async (_, { amount }, context) => {
            const token = context.req.headers.authorization;

            const authResult = verifyToken({ token: token.split(' ')[1] });

            if (authResult.error) {
                throw new AuthenticationError(authResult.error);
            }

            const user: any = await User.findOne({ _id: authResult.userId });

            if (user.balance < amount) {
                throw new ApolloError('Not enough balance');
            }

            const result: any = await User.findOneAndUpdate({ _id: authResult.userId }, { $inc: { balance: -amount } }, { new: true });

            return { newBalance: result.balance };
        },
        changeUsername: async (_, { newUsername, confirmPassword }, context) => {
            const token = context.req.headers.authorization;

            const authResult = verifyToken({ token: token.split(' ')[1] });

            if (authResult.error) {
                throw new AuthenticationError(authResult.error);
            }

            const nameExists: any = await User.findOne({ username: newUsername });

            if (nameExists) {
                throw new ApolloError('Username already taken. Try another.');
            }

            const user: any = await User.findOne({ _id: authResult.userId });

            const passResult = await bcrypt.compare(confirmPassword, user.password);

            if (!passResult) {
                throw new AuthenticationError('Invalid password, try again.');
            }

            const result: any = await User.findOneAndUpdate({ _id: authResult.userId }, { username: newUsername }, { new: true });

            return { newUsername: result.username };
        },
    },

    Query: {
        getUser: async (_, args, context) => {
            const token = context.req.headers.authorization;

            const result = verifyToken({ token: token.split(' ')[1] });

            if (result.error) {
                throw new AuthenticationError(result.error);
            }

            const user: any = await User.findOne({ _id: result.userId });

            return { user, token: token.split(' ')[1] };
        },
    },
};

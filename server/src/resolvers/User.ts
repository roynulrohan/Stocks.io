import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { validateRegisterInput, validateLoginInput } from '../utils/AuthValidator';
import verifyToken from '../middleware/auth';

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

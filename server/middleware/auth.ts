import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const verifyToken = ({ token }) => {
    try {
        const isCustomAuth = token.length < 500;
        let contentDecoded;
        let userId;

        if (token && isCustomAuth) {
            contentDecoded = jwt.verify(token, jwtSecret);
            userId = contentDecoded?.id;
        } else {
            contentDecoded = jwt.decode(token);
            userId = contentDecoded?.sub;
        }

        return { userId };
    } catch (error) {
        return { error: 'Invalid Token' };
    }
};

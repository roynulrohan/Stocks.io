import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

interface Response {
    error?: string;
    userId?: string;
}

export const verifyToken = async (token: string) => {
    const bearerToken = token.split(' ')[1];

    const result: Response = await new Promise((resolve, reject) => {
        const isCustomAuth = bearerToken.length < 500;
        let contentDecoded: string | jwt.JwtPayload;
        let userId: string;

        if (bearerToken && isCustomAuth) {
            contentDecoded = jwt.verify(bearerToken, jwtSecret);
            userId = (contentDecoded as jwt.JwtPayload).id;
        } else {
            contentDecoded = jwt.decode(bearerToken);
            userId = (contentDecoded as jwt.JwtPayload).sub;
        }

        if (!userId) {
            resolve({ error: 'Invalid Token' });
        }

        resolve({ userId });
    });

    return result;
};

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AuthRequest } from '../interfaces/auth-request.interface';
import { tokenData } from '../types/token-data.type';
import { AuthError } from '../errors/auth.error';

export const isAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.get('Authorization');

        if (!authHeader) {
            throw new AuthError('user not authorized! - (no authorization header)');
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

        if (!decodedToken) {
            throw new AuthError('user not authorized! - (no token)');
        }

        req.tokenData = decodedToken as tokenData;
        next();
    } catch (err) {
        next(err);
    }
};
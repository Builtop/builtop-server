import jwt from 'jsonwebtoken';

import { tokenData } from '../types/token-data.type';

export class JWT {
    static sign(object: tokenData, options?: jwt.SignOptions | undefined) {
        if (!process.env.JWT_SECRET) {
            throw new Error('jwt secret is not defined');
        }
        
        return jwt.sign(object, process.env.JWT_SECRET, options);
    }

    static decode(token: string) {
        if (!process.env.JWT_SECRET) {
            throw new Error('jwt secret is not defined');
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return { valid: true, expired: false, decoded };
    
        } catch (err: any) {
            return { valid: false, expired: err.message === 'jwt expired', decoded: null };
    
        }
    }
}
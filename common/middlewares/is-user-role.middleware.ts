import { Response, NextFunction } from 'express';

import { AuthRequest } from '../interfaces/operations/auth-request.interface';
import { AuthError } from '../errors/auth.error';
import { UserRoles } from '../enums/users/user-roles.enum';

export const isUserRole = (roles: UserRoles[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.tokenData) {
                throw new AuthError('user not authorized!');
            }

            let inRole = false;
            for (const role of roles) {
                if (req.tokenData.role === role) {
                    inRole = true;
                    break;
                }
            }

            if (!inRole) {
                throw new AuthError(`this endpoint is protected to only: ${ roles.join(' and ') }`);
            }

            next();
        } catch (err) {
            next(err);
        }
    }
}
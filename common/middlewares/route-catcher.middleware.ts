import { Request, Response, NextFunction } from 'express';

import { NotFoundError } from '../errors/not-found.error';

export const routeCatcher = (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new NotFoundError('not found');
    } catch (err) {
        next(err);
    }
}
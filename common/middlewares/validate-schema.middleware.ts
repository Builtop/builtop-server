import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';

export const validateSchema = (schema: AnySchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body);
            next();
        } catch (err) {
            next(err);
        }
    }
}
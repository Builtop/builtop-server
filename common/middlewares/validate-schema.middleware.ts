import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';

export const validateSchema = (schema: AnySchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await schema.validate(req.body);
            req.body = result;
            next();
        } catch (err) {
            next(err);
        }
    }
}
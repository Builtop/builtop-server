import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

import { ValidationError } from "../errors/validation.error";

export const validateSchema = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.validate(req.body);
      req.body = result;
      next();
    } catch (err: any) {
      next(new ValidationError(err.message));
    }
  };
};

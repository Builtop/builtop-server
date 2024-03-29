import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { ProcessResult } from '../interfaces/operations/process-result.interface';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.getResponse());
    }

    res.status(500).json(<ProcessResult<any>> {
        success: false,
        innerError: error.message
    });
}
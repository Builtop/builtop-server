import { ProcessResult } from '../interfaces/operations/process-result.interface';

export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract getResponse(): ProcessResult<any>;
}
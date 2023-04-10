import { CustomError } from './custom-error';
import { ProcessResult } from '../interfaces/process-result.interface';

export class BadRequestError extends CustomError {
    statusCode: number = 400;
    
    constructor(message: string) {
        super(message);

        this.message = message;

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    getResponse(): ProcessResult<undefined> {
        return {
            success: false,
            errorMessage: this.message
        }
    }
}
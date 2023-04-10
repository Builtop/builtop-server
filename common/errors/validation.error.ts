import { CustomError } from './custom-error';
import { ProcessResult } from '../interfaces/process-result.interface';

export class ValidationError extends CustomError {
    statusCode: number = 422;
    
    constructor(message: string) {
        super(message);

        this.message = message;

        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    getResponse(): ProcessResult<undefined> {
        return {
            success: false,
            errorMessage: this.message
        }
    }
}
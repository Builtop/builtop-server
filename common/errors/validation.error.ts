import { CustomError } from './custom-error';
import { ProcessResult } from '../interfaces/operations/process-result.interface';

export class ValidationError extends CustomError {
    statusCode: number = 422;
    
    constructor(message: string) {
        super(message);

        this.message = message;

        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    getResponse(): ProcessResult<any> {
        return {
            success: false,
            errorMessage: this.message
        }
    }
}
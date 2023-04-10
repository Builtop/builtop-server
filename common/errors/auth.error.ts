import { CustomError } from './custom-error';
import { ProcessResult } from '../interfaces/process-result.interface';

export class AuthError extends CustomError {
    statusCode: number = 401;
    
    constructor(message: string) {
        super(message);

        this.message = message;

        Object.setPrototypeOf(this, AuthError.prototype);
    }

    getResponse(): ProcessResult<undefined> {
        return {
            success: false,
            errorMessage: this.message
        }
    }
}
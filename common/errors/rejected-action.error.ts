import { CustomError } from './custom-error';
import { ProcessResult } from '../interfaces/process-result.interface';

export class RejectedActionError extends CustomError {
    statusCode: number = 406;
    
    constructor(message: string) {
        super(message);

        this.message = message;

        Object.setPrototypeOf(this, RejectedActionError.prototype);
    }

    getResponse(): ProcessResult<undefined> {
        return {
            success: false,
            errorMessage: this.message
        }
    }
}
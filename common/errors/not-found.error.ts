import { CustomError } from './custom-error';
import { ProcessResult } from '../interfaces/operations/process-result.interface';

export class NotFoundError extends CustomError {
    statusCode: number = 404;
    
    constructor(message: string) {
        super(message);

        this.message = message;

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    getResponse(): ProcessResult<any> {
        return {
            success: false,
            errorMessage: this.message
        }
    }
}
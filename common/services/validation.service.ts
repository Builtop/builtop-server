import { Types } from 'mongoose';

import { ValidationError } from '../errors/validation.error';

export class Validation {
    static isObjectId(data: string) {
        if (!Types.ObjectId.isValid(data)) {
            throw new ValidationError(`validation error - ${data} have to be valid ObjectId type.`);
        }

        const ID = new Types.ObjectId(data);

        if (data !== ID.toString()) {
            throw new ValidationError(`validation error - ${data} have to be valid ObjectId type.`);
        }
    }
}
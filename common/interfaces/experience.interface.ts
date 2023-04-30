import { Document, ObjectId } from 'mongoose';

import { IUser } from '../interfaces/user.interface';
import { lookupStatus } from '../enums/lookup-status.enum';

export interface Experience {
    title: string,
    createdBy: ObjectId | IUser<any>,
    status: lookupStatus
}

export interface IExperience extends Document, Experience {};
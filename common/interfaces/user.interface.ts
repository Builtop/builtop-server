import { ObjectId, Document } from 'mongoose';

import { infoType } from '../enums/info-type.enum';
import { userStatus } from '../enums/user-status.enum';

export interface User<T> {
    email: string,
    password: string,
    privileges: string[],
    infoType?: infoType,
    info?: ObjectId | T,
    status: userStatus
}

export interface IUser<T> extends Document, User<T> {}

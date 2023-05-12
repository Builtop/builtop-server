import { ObjectId, Document } from 'mongoose';

import { infoType } from '../enums/info-type.enum';
import { userStatus } from '../enums/user-status.enum';

export interface UserData<T> {
    email: string,
    phoneNum: string,
    password: string,
    privileges: string[],
    infoColl?: infoType,
    info?: ObjectId | T,
    status: userStatus
}

export interface IUser<T> extends Document, UserData<T> {}

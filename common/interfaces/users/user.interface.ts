import { ObjectId, Document } from 'mongoose';

import { InfoTypes } from '../../enums/users/info-types.enum';
import { UserStatus } from '../../enums/users/user-status.enum';

export interface User<T> {
    email: string,
    phoneNum: string,
    password: string,
    infoColl?: InfoTypes,
    info?: ObjectId | T,
    privileges: string[],
    isPhoneNumValid: Boolean,
    isEmailValid: Boolean,
    status: UserStatus
}

export interface IUser<T> extends Document, User<T> {};
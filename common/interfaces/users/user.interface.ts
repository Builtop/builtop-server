import { ObjectId, Document } from 'mongoose';

import { InfoType } from '../../enums/users/info-type.enum';
import { UserStatus } from '../../enums/users/user-status.enum';

export interface User<T> {
    email: string,
    phoneNum: string,
    password: string,
    infoColl?: InfoType,
    info?: ObjectId | T,
    privileges: string[],
    isPhoneNumValid: Boolean,
    isEmailValid: Boolean,
    status: UserStatus
}

export interface IUser<T> extends Document, User<T> {};
import { ObjectId } from 'mongoose';

import { roles } from '../enums/roles.enum';

export type tokenData = {
    _id: ObjectId | string,
    phoneNum: string,
    role: roles | 'no-role',
    privileges: string[]
}
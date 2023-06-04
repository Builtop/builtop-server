import { ObjectId } from 'mongoose';

import { ManagerRoles } from '../enums/managers/manager-roles.enum';
import { UserRoles } from '../enums/users/user-roles.enum';

export type tokenData = {
    _id: ObjectId | string,
    phoneNum: string,
    email: string,
    role: ManagerRoles | UserRoles,
    privileges: string[]
}
import { Document } from 'mongoose';

import { ManagerRoles } from '../../enums/managers/manager-roles.enum';
import { ManagerStatus } from '../../enums/managers/manager-status.enum';

export interface Manager {
    email: string,
    phoneNum: string,
    password: string,
    name: string,
    image: string,
    role: ManagerRoles,
    privileges: string[],
    isPhoneNumValid: Boolean,
    isEmailValid: Boolean,
    status: ManagerStatus
}

export interface IManager extends Document, Manager {};
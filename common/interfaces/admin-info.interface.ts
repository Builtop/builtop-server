import { Document } from 'mongoose';

import { roles } from '../enums/roles.enum';

export interface AdminInfo {
    role: roles,
    name: string,
    email: string,
    image: string,
}

export interface IAdminInfo extends Document, AdminInfo {};